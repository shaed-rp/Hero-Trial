'use client';

import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

interface PerformanceObserver {
  observe: (options: { entryTypes: string[] }) => void;
  disconnect: () => void;
}

declare global {
  interface Window {
    PerformanceObserver: {
      new (callback: (list: any) => void): PerformanceObserver;
      supportedEntryTypes: string[];
    };
  }
}

export const usePerformance = () => {
  const trackMetric = useCallback((name: string, value: number) => {
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        page_path: window.location.pathname,
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value);
    }
  }, []);

  const measureFCP = useCallback(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    const observer = new window.PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name === 'first-contentful-paint') {
          trackMetric('FCP', entry.startTime);
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
    return () => observer.disconnect();
  }, [trackMetric]);

  const measureLCP = useCallback(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    const observer = new window.PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry) {
        trackMetric('LCP', lastEntry.startTime);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    return () => observer.disconnect();
  }, [trackMetric]);

  const measureFID = useCallback(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    const observer = new window.PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        trackMetric('FID', entry.processingStart - entry.startTime);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    return () => observer.disconnect();
  }, [trackMetric]);

  const measureCLS = useCallback(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    let clsValue = 0;
    const observer = new window.PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Report CLS on page unload
    const reportCLS = () => {
      trackMetric('CLS', clsValue);
    };

    window.addEventListener('beforeunload', reportCLS);
    return () => {
      observer.disconnect();
      window.removeEventListener('beforeunload', reportCLS);
    };
  }, [trackMetric]);

  const measureTTFB = useCallback(() => {
    if (typeof window === 'undefined') return;

    const navigation = performance.getEntriesByType('navigation')[0] as any;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      trackMetric('TTFB', ttfb);
    }
  }, [trackMetric]);

  useEffect(() => {
    const cleanupFCP = measureFCP();
    const cleanupLCP = measureLCP();
    const cleanupFID = measureFID();
    const cleanupCLS = measureCLS();

    // Measure TTFB after a short delay to ensure navigation timing is available
    const ttfbTimeout = setTimeout(measureTTFB, 100);

    return () => {
      cleanupFCP?.();
      cleanupLCP?.();
      cleanupFID?.();
      cleanupCLS?.();
      clearTimeout(ttfbTimeout);
    };
  }, [measureFCP, measureLCP, measureFID, measureCLS, measureTTFB]);

  return {
    trackMetric,
  };
}; 