import { useEffect, useRef } from 'react';
import { analytics } from '../utils/analytics';

export const useAnalytics = () => {
  const hasTrackedPageView = useRef(false);

  useEffect(() => {
    if (!hasTrackedPageView.current) {
      analytics.trackEvent('page_view', {
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
      hasTrackedPageView.current = true;
    }
  }, []);

  const trackSectionView = (sectionId: string) => {
    analytics.trackSectionView(sectionId);
  };

  const trackInteraction = (element: string, action: string, data?: Record<string, any>) => {
    analytics.trackInteraction(element, action, data);
  };

  const trackCustomEvent = (type: string, data: Record<string, any>) => {
    analytics.trackEvent('interaction', { type, ...data });
  };

  return {
    trackSectionView,
    trackInteraction,
    trackCustomEvent
  };
};