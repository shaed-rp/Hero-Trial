'use client';

import { useEffect, useState } from 'react';
import { usePerformance } from '@/hooks/usePerformance';
import styles from './PerformanceMonitor.module.scss';

interface PerformanceData {
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceData>({});
  const { trackMetric } = usePerformance();

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const updateMetrics = () => {
      if (typeof window === 'undefined') return;

      const navigation = performance.getEntriesByType('navigation')[0] as any;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        setMetrics(prev => ({ ...prev, TTFB: Math.round(ttfb) }));
      }
    };

    // Update metrics after page load
    const timeout = setTimeout(updateMetrics, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className={styles.performanceMonitor}>
      <h3>Performance Metrics</h3>
      <div className={styles.metrics}>
        {metrics.TTFB && (
          <div className={styles.metric}>
            <span className={styles.label}>TTFB:</span>
            <span className={styles.value}>{metrics.TTFB}ms</span>
          </div>
        )}
        <div className={styles.metric}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>Monitoring</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor; 