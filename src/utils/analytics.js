// Performance monitoring for Core Web Vitals
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((webVitals) => {
      const getCLS = webVitals.onCLS || webVitals.getCLS;
      const getFID = webVitals.onFID || webVitals.getFID;
      const getFCP = webVitals.onFCP || webVitals.getFCP;
      const getLCP = webVitals.onLCP || webVitals.getLCP;
      const getTTFB = webVitals.onTTFB || webVitals.getTTFB;
      
      if (getCLS) getCLS(onPerfEntry);
      if (getFID) getFID(onPerfEntry);
      if (getFCP) getFCP(onPerfEntry);
      if (getLCP) getLCP(onPerfEntry);
      if (getTTFB) getTTFB(onPerfEntry);
    }).catch(err => console.log('Web Vitals not available:', err));
  }
};

// Analytics tracking function
export const trackEvent = (action, category, label, value) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Page view tracking
export const trackPageView = (path) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path
    });
  }
};