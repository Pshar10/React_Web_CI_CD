interface AnalyticsEvent {
  type: 'page_view' | 'section_view' | 'interaction' | 'performance' | 'error';
  data: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId: string;
}

interface UserSession {
  sessionId: string;
  userId: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  interactions: number;
  device: string;
  browser: string;
  location?: string;
}

class PortfolioAnalytics {
  private sessionId: string;
  private userId: string;
  private startTime: number;
  private events: AnalyticsEvent[] = [];
  private isTracking: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.startTime = Date.now();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('portfolio_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('portfolio_user_id', userId);
    }
    return userId;
  }

  private initializeTracking(): void {
    // Track page load
    this.trackEvent('page_view', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timestamp: new Date().toISOString()
    });

    // Track performance metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        this.trackEvent('performance', {
          loadTime: perfData.loadEventEnd - perfData.loadEventStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          firstPaint: this.getFirstPaint(),
          firstContentfulPaint: this.getFirstContentfulPaint()
        });
      }, 1000);
    });

    // Track errors
    window.addEventListener('error', (event) => {
      this.trackEvent('error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('error', {
        type: 'unhandled_promise_rejection',
        reason: event.reason
      });
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('interaction', {
        type: 'visibility_change',
        hidden: document.hidden
      });
    });

    // Track scroll behavior
    let scrollTimeout: number;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        this.trackEvent('interaction', {
          type: 'scroll',
          scrollPercent,
          scrollY: window.scrollY
        });
      }, 250);
    });

    // Send data periodically
    setInterval(() => {
      this.sendAnalytics();
    }, 30000); // Send every 30 seconds

    // Send data before page unload
    window.addEventListener('beforeunload', () => {
      this.sendAnalytics(true);
    });
  }

  private getFirstPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  private getFirstContentfulPaint(): number | null {
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstContentfulPaint ? firstContentfulPaint.startTime : null;
  }

  public trackEvent(type: AnalyticsEvent['type'], data: Record<string, any>): void {
    if (!this.isTracking) return;

    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.events.push(event);

    // Keep only last 100 events in memory
    if (this.events.length > 100) {
      this.events = this.events.slice(-100);
    }
  }

  public trackSectionView(sectionId: string): void {
    this.trackEvent('section_view', {
      sectionId,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  }

  public trackInteraction(element: string, action: string, data?: Record<string, any>): void {
    this.trackEvent('interaction', {
      element,
      action,
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  private async sendAnalytics(isBeforeUnload: boolean = false): Promise<void> {
    if (this.events.length === 0) return;

    const payload = {
      sessionId: this.sessionId,
      userId: this.userId,
      events: [...this.events],
      sessionData: {
        startTime: this.startTime,
        duration: Date.now() - this.startTime,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      }
    };

    try {
      // Store in localStorage as backup
      const existingData = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
      existingData.push(...this.events);
      localStorage.setItem('portfolio_analytics', JSON.stringify(existingData.slice(-500))); // Keep last 500 events

      // Send to analytics endpoint (you can replace this with your preferred service)
      if (isBeforeUnload) {
        // Use sendBeacon for reliable delivery during page unload
        navigator.sendBeacon('/api/analytics', JSON.stringify(payload));
      } else {
        // Use fetch for regular sends
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        }).catch(() => {
          // Silently fail - data is already stored in localStorage
        });
      }

      // Clear sent events
      this.events = [];
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  public getStoredAnalytics(): any[] {
    return JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
  }

  public clearStoredAnalytics(): void {
    localStorage.removeItem('portfolio_analytics');
  }

  public disable(): void {
    this.isTracking = false;
  }

  public enable(): void {
    this.isTracking = true;
  }
}

export const analytics = new PortfolioAnalytics();