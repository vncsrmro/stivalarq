// Himetrica Analytics Tracker Integration
// https://himetrica.com

declare global {
  interface Window {
    himetrica?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
      identify: (user: {
        name?: string;
        email?: string;
        metadata?: Record<string, unknown>;
      }) => void;
    };
  }
}

/**
 * Track a custom event with Himetrica.
 * Runs strictly client-side in the browser.
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  if (window.himetrica?.track) {
    try {
      window.himetrica.track(eventName, properties);
    } catch (err) {
      console.warn('[Himetrica] track error:', err);
    }
    return;
  }

  // If the script is still loading asynchronously, retry shortly
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (window.himetrica?.track) {
      clearInterval(interval);
      try {
        window.himetrica.track(eventName, properties);
      } catch (err) {
        console.warn('[Himetrica] track error:', err);
      }
    } else if (attempts >= 10) {
      clearInterval(interval);
    }
  }, 250);
}

/**
 * Identify a user in Himetrica (e.g. after login or form submission).
 * Runs strictly client-side in the browser.
 */
export function identifyUser(user: {
  name?: string;
  email?: string;
  metadata?: Record<string, unknown>;
}): void {
  if (typeof window === 'undefined') return;

  if (window.himetrica?.identify) {
    try {
      window.himetrica.identify(user);
    } catch (err) {
      console.warn('[Himetrica] identify error:', err);
    }
    return;
  }

  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (window.himetrica?.identify) {
      clearInterval(interval);
      try {
        window.himetrica.identify(user);
      } catch (err) {
        console.warn('[Himetrica] identify error:', err);
      }
    } else if (attempts >= 10) {
      clearInterval(interval);
    }
  }, 250);
}
