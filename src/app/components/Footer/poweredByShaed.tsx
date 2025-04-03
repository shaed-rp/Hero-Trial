import Image from 'next/image';
import shaedSLogo from '@icons/shaedSLogo.png';
import styles from './poweredByShaed.module.scss';

export default function PoweredByShaedFooter() {
  return (
    <div className={styles.poweredByShaed}>
      <div>
        <a href='https://shaed.ai' className={styles.shaedLink}>
          <Image src={shaedSLogo} alt='Shaed Logo' width='35' height='35' />
        </a>
      </div>

      <p className={styles.footerText}>Powered by SHAED</p>
    </div>
  );
}
