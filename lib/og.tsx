/**
 * Shared Open Graph image renderer.
 *
 * Next.js turns any `opengraph-image.tsx` route file into a build-time PNG via
 * Satori, so social cards are generated from code and stay in sync with the
 * brand automatically. Every page's card funnels through `ogImage()` below so
 * they share one layout; only the words change.
 *
 * Satori supports a subset of CSS: every element with more than one child needs
 * an explicit `display: flex`, and there is no `gap` shorthand inheritance, so
 * spacing is done with margins.
 */
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Open Graph's canonical card size. Also what X, LinkedIn, and Slack expect.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Brand gradient, matching --brand-from / --brand-to in globals.css.
const BRAND_FROM = "#4338ca";
const BRAND_TO = "#9333ea";
const BRAND_ACCENT = "#f59e0b";

export function ogImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #2e1065 100%)",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Purple bloom in the top-right, echoing the site's hero glow. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: BRAND_TO,
            opacity: 0.28,
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${BRAND_FROM} 0%, ${BRAND_TO} 100%)`,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "white",
            }}
          >
            IF
          </div>
          <div
            style={{
              marginLeft: 20,
              fontSize: 30,
              fontWeight: 600,
              color: "white",
              letterSpacing: -0.5,
            }}
          >
            {SITE.name}
          </div>
        </div>

        {/* Message */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginBottom: 24,
                padding: "10px 22px",
                borderRadius: 9999,
                border: `1px solid ${BRAND_ACCENT}`,
                color: BRAND_ACCENT,
                fontSize: 22,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#cbd5e1",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Footer rule + domain */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 6,
              width: 180,
              borderRadius: 9999,
              background: `linear-gradient(90deg, ${BRAND_TO} 0%, ${BRAND_ACCENT} 100%)`,
            }}
          />
          <div style={{ marginTop: 22, fontSize: 26, color: "#94a3b8" }}>
            {SITE.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
