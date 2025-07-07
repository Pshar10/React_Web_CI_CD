import React, { createContext, useContext, useEffect, useState } from 'react';
import { analytics } from '../utils/analytics';

interface AnalyticsContextType {
  trackSectionView: (sectionId: string) => void;
  trackInteraction: (element: string, action: string, data?: Record<string, any>) => void;
  trackCustomEvent: (type: string, data: Record<string, any>) => void;
  isEnabled: boolean;
  toggleTracking: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Check if user has opted out
    const hasOptedOut = localStorage.getItem('analytics_opted_out') === 'true';
    if (hasOptedOut) {
      analytics.disable();
      setIsEnabled(false);
    }
  }, []);

  const trackSectionView = (sectionId: string) => {
    if (isEnabled) {
      analytics.trackSectionView(sectionId);
    }
  };

  const trackInteraction = (element: string, action: string, data?: Record<string, any>) => {
    if (isEnabled) {
      analytics.trackInteraction(element, action, data);
    }
  };

  const trackCustomEvent = (type: string, data: Record<string, any>) => {
    if (isEnabled) {
      analytics.trackEvent('interaction', { type, ...data });
    }
  };

  const toggleTracking = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    
    if (newState) {
      analytics.enable();
      localStorage.removeItem('analytics_opted_out');
    } else {
      analytics.disable();
      localStorage.setItem('analytics_opted_out', 'true');
    }
  };

  return (
    <AnalyticsContext.Provider value={{
      trackSectionView,
      trackInteraction,
      trackCustomEvent,
      isEnabled,
      toggleTracking
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};