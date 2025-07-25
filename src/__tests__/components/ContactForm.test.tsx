import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/app/components/Form/ContactForm/ContactForm';

// Mock the ReCAPTCHA component
jest.mock('react-google-recaptcha', () => {
  return function MockReCAPTCHA({ onChange }: { onChange: (token: string | null) => void }) {
    return (
      <div data-testid="recaptcha">
        <button onClick={() => onChange('mock-token')}>Complete reCAPTCHA</button>
      </div>
    );
  };
});

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm', () => {
  const mockOnSubmit = jest.fn();
  const mockSiteTitle = 'Test Vehicle';

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ recaptchaKey: 'test-key' }),
    });
  });

  it('renders form fields correctly', () => {
    render(<ContactForm onSubmit={mockOnSubmit} siteTitle={mockSiteTitle} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} siteTitle={mockSiteTitle} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} siteTitle={mockSiteTitle} />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('shows reCAPTCHA after form validation passes', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={mockOnSubmit} siteTitle={mockSiteTitle} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByTestId('recaptcha')).toBeInTheDocument();
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ recaptchaKey: 'test-key' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

    render(<ContactForm onSubmit={mockOnSubmit} siteTitle={mockSiteTitle} />);

    // Fill in form
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/company name/i), 'Test Company');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Complete reCAPTCHA
    const recaptchaButton = screen.getByText('Complete reCAPTCHA');
    await user.click(recaptchaButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        company: 'Test Company',
      });
    });
  });

  it('handles form submission errors', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ recaptchaKey: 'test-key' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Server error' }),
      });

    render(<ContactForm onSubmit={mockOnSubmit} siteTitle={mockSiteTitle} />);

    // Fill in form
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Complete reCAPTCHA
    const recaptchaButton = screen.getByText('Complete reCAPTCHA');
    await user.click(recaptchaButton);

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });
}); 