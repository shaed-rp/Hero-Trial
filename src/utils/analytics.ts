declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: [string, Record<string, unknown>]) => void;
  }
}

const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
  route?: string
) => {
  const eventData = {
    event: 'custom_event',
    category,
    action,
    label,
    value,
    route: route || window.location.pathname,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

export { trackEvent };
