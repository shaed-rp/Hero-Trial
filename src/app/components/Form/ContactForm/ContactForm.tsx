'use client';

import React, { useState, useEffect } from 'react';
import styles from './ContactForm.module.scss';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => void;
  siteTitle: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

const ContactForm = ({ onSubmit, siteTitle }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
  });
  const [siteKey, setSiteKey] = useState('');

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isValid, setIsValid] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== null);
    const requiredFieldsFilled = ['firstName', 'lastName', 'email'].every(
      (field) => formData[field as keyof ContactFormData] !== ''
    );
    setIsValid(!hasErrors && requiredFieldsFilled);
  }, [formData, errors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null); // Clear any previous submit errors
    
    if (name !== 'company') {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    let error = null;

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.trim() === '') {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (!/^[A-Za-z.'\- ]+$/.test(value.trim())) {
          error = `${
            name === 'firstName' ? 'First' : 'Last'
          } name must contain only letters`;
        } else if (value.trim().length > 50) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is too long`;
        }
        break;
      case 'email':
        if (value.trim() === '') {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Invalid email format';
        } else if (value.trim().length > 100) {
          error = 'Email is too long';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setSubmitError(null); // Clear any previous submit errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (isValid && !showCaptcha) {
      setShowCaptcha(true);
      return;
    }

    if (isValid && captchaToken) {
      setIsLoading(true);
      setSubmitError(null);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, siteTitle, captchaToken }),
        });

        const responseData = await response.json();

        if (response.ok && responseData.success) {
          onSubmit(formData);
        } else {
          setSubmitError(responseData.message || 'Failed to submit form. Please try again.');
          console.error('Failed to send email:', responseData);
        }
      } catch (error) {
        setSubmitError('Network error. Please check your connection and try again.');
        console.error('Error submitting form:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (!captchaToken) {
      setSubmitError('Please complete the reCAPTCHA verification.');
    }
  };

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const response = await fetch('/api/contact');
        if (response.ok) {
          const data = await response.json();
          setSiteKey(data.recaptchaKey);
        } else {
          console.error('Failed to fetch reCAPTCHA site key');
        }
      } catch (error) {
        console.error('Error fetching reCAPTCHA site key:', error);
      }
    };

    fetchSiteKey();
  }, []);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.innerContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor='firstName'>
              First Name<span className={styles.required}>*</span>
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder='Enter first name'
              required
              disabled={isLoading}
              maxLength={50}
            />
            {errors.firstName && (
              <p className={styles.errorMessage}>{errors.firstName}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='lastName'>
              Last Name<span className={styles.required}>*</span>
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder='Enter last name'
              required
              disabled={isLoading}
              maxLength={50}
            />
            {errors.lastName && (
              <p className={styles.errorMessage}>{errors.lastName}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='email'>
              Email<span className={styles.required}>*</span>
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter your email'
              required
              disabled={isLoading}
              maxLength={100}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='company'>Company Name</label>
            <input
              type='text'
              id='company'
              name='company'
              value={formData.company}
              onChange={handleInputChange}
              placeholder='Enter company name'
              disabled={isLoading}
              maxLength={100}
            />
          </div>
        </div>

        {showCaptcha && (
          <div className={styles.captchaContainer}>
            <ReCAPTCHA 
              sitekey={siteKey} 
              onChange={handleCaptchaChange}
              disabled={isLoading}
            />
          </div>
        )}

        {submitError && (
          <div className={styles.submitError}>
            <p>{submitError}</p>
          </div>
        )}

        <button
          type='submit'
          className={styles.submitButton}
          disabled={!isValid || (showCaptcha && !captchaToken) || isLoading}
        >
          {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
