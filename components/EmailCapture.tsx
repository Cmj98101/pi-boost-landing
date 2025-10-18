"use client";

import { useState } from "react";

interface EmailCaptureProps {
  variant?: "hero" | "footer" | "inline";
  onSuccess?: () => void;
  className?: string;
}

export default function EmailCapture({
  variant = "inline",
  onSuccess,
  className = "",
}: EmailCaptureProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/email-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Thank you! We'll notify you when we launch.");
        setFormData({ name: "", email: "" });
        onSuccess?.();
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Different layouts based on variant
  if (variant === "hero") {
    return (
      <div
        className={`bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md mx-auto ${className}`}
      >
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Get Early Access
        </h3>
        {isSuccess ? (
          <div className="text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <p className="text-green-600 font-semibold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary btn-lg text-white disabled:opacity-50"
            >
              {isLoading ? "Joining..." : "Join Waitlist"}
            </button>
            {message && (
              <p
                className={`text-center text-sm ${
                  isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`${className}`}>
        <h4 className="font-bold mb-4">Stay Updated</h4>
        <p className="text-gray-400 text-sm mb-4">
          Get notified when we launch and receive early access.
        </p>
        {isSuccess ? (
          <div className="text-green-400 text-sm">{message}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary btn-sm text-white disabled:opacity-50"
            >
              {isLoading ? "Joining..." : "Join Waitlist"}
            </button>
            {message && (
              <p
                className={`text-xs ${
                  isSuccess ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={`${className}`}>
      {isSuccess ? (
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <div className="text-green-600 text-4xl mb-2">✓</div>
          <p className="text-green-600 font-semibold">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary btn-lg text-white disabled:opacity-50"
          >
            {isLoading ? "Joining..." : "Join Waitlist"}
          </button>
          {message && (
            <p
              className={`text-center text-sm ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

