import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { trackEvent } from '@/utils/analytics';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isSubmitted: boolean;
  pageName: string;
  vehiclePath: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  isSubmitted,
  pageName,
  vehiclePath,
}: ModalProps) => {
  const router = useRouter();

  const handleClose = () => {
    trackEvent(
      'Engagement',
      'modal_close',
      `Modal Close - ${pageName}`,
      undefined,
      window.location.pathname
    );
    onClose();
  };

  useEffect(() => {
    if (isSubmitted) {
      localStorage.setItem('returnPath', window.location.pathname);
      router.push(`/${vehiclePath}/thankyou`);
    }
  }, [isSubmitted, router, vehiclePath]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1 className={styles.modalHeader}>Request Information</h1>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
