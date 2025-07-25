declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'react-google-recaptcha' {
  import { Component } from 'react';
  
  interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    disabled?: boolean;
    theme?: 'light' | 'dark';
    size?: 'normal' | 'compact' | 'invisible';
    tabindex?: number;
    onExpired?: () => void;
    onErrored?: () => void;
  }
  
  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {}
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
} 