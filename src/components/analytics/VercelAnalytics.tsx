import React, { useEffect } from 'react';

/**
 * Optional Vercel Analytics and Speed Insights Injector
 * Controlled cleanly via environment variable: VITE_ENABLE_VERCEL_ANALYTICS="true"
 * When disabled (default), zero bundle overhead and zero external network requests.
 */
export const VercelAnalytics: React.FC = () => {
  useEffect(() => {
    const isAnalyticsEnabled =
      import.meta.env.VITE_ENABLE_VERCEL_ANALYTICS === 'true' ||
      import.meta.env.VITE_ENABLE_VERCEL_ANALYTICS === true;

    if (!isAnalyticsEnabled || typeof window === 'undefined') return;

    // Inject Vercel Insights Script only if explicitly enabled
    const existingScript = document.getElementById('vercel-insights-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'vercel-insights-script';
      script.src = 'https://va.vercel-scripts.com/v1/script.js';
      script.defer = true;
      script.setAttribute('data-endpoint', '/_vercel/insights');
      document.head.appendChild(script);
    }
  }, []);

  return null;
};
