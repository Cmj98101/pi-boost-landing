"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";

interface PaymentButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  planType?: "monthly" | "yearly" | "default";
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PaymentButton({
  variant = "primary",
  size = "lg",
  text = "Start 7-Day Free Trial",
  className = "",
  planType = "default",
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    // Track payment button click
    analytics.paymentButtonClicked(planType);
    analytics.trialSignupStarted(planType);

    try {
      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType: planType,
          trial_days: 7,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Payment error:", error);
      onError?.(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = "btn";
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
    };
    const sizeClasses = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${getButtonClasses()} disabled:opacity-50`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="loading loading-spinner loading-sm"></span>
          Processing...
        </span>
      ) : (
        text
      )}
    </button>
  );
}

