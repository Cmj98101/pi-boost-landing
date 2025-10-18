// Google Analytics event tracking helper
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
};

// Specific event trackers
export const analytics = {
  // Email capture events
  emailCaptureStart: () => {
    trackEvent("email_capture_started", {
      event_category: "engagement",
      event_label: "email_form_interaction",
    });
  },

  emailCaptureSuccess: (email: string) => {
    trackEvent("email_capture_success", {
      event_category: "conversion",
      event_label: "waitlist_signup",
      value: 1,
    });
    // Also track as a conversion
    trackEvent("conversion", {
      send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Replace with your conversion ID
      value: 1,
      currency: "USD",
    });
  },

  emailCaptureFailed: (error: string) => {
    trackEvent("email_capture_failed", {
      event_category: "error",
      event_label: error,
    });
  },

  // Payment button clicks
  paymentButtonClicked: (planType: string) => {
    trackEvent("payment_button_clicked", {
      event_category: "engagement",
      event_label: `${planType}_plan`,
      plan_type: planType,
    });
  },

  // Trial signup events
  trialSignupStarted: (planType: string) => {
    trackEvent("begin_checkout", {
      event_category: "ecommerce",
      event_label: `${planType}_trial`,
      plan_type: planType,
      value: planType === "yearly" ? 490 : 49,
      currency: "USD",
    });
  },

  // Page view tracking (automatically handled by GA, but you can customize)
  pageView: (url: string) => {
    trackEvent("page_view", {
      page_path: url,
    });
  },
};
