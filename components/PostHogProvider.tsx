"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://m.investigationflow.com",
      ui_host: "https://us.posthog.com", // api_host is a reverse proxy; toolbar/links go to PostHog itself
      defaults: "2026-05-30",
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      cross_subdomain_cookie: true,
      // Recorder (~52 KiB) loads on first interaction instead of page load
      disable_session_recording: true,
      disable_surveys: true,
      capture_dead_clicks: false,
    });

    const interactionEvents = ["pointerdown", "keydown", "scroll", "touchstart"];
    const startRecording = () => {
      posthog.startSessionRecording();
      interactionEvents.forEach((e) =>
        window.removeEventListener(e, startRecording)
      );
    };
    interactionEvents.forEach((e) =>
      window.addEventListener(e, startRecording, { passive: true })
    );
    return () =>
      interactionEvents.forEach((e) =>
        window.removeEventListener(e, startRecording)
      );
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
