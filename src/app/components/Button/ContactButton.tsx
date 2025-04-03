import styles from './ContactButton.module.scss';
import { usePathname } from 'next/navigation';

interface SiteConfig {
  brandColor: string;
}

interface ButtonProps {
  siteConfig: SiteConfig;
  openModal: () => void;
  buttonStyles?: React.CSSProperties;
  buttonText?: string;
  id: string;
}

const ContactSalesButton = ({
  siteConfig,
  openModal,
  buttonStyles,
  buttonText = 'Request Info',
  id,
}: ButtonProps) => {
  const pathname = usePathname();

  const handleButtonClick = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        button_text: buttonText,
        page_path: pathname,
        id: id,
      });
    }
    openModal();
  };

  return (
    <button
      id={id}
      className={styles.contactBtn}
      style={{
        backgroundColor: siteConfig.brandColor,
        fontWeight: 'bold',
        ...buttonStyles,
      }}
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  );
};

export default ContactSalesButton;
