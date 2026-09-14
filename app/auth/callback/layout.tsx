import type { Metadata } from "next";

// The callback page is a client component, so it can't export metadata itself.
// This layout supplies it. Without a `robots` rule the page inherits the root
// canonical, which would make it declare itself as the homepage.
export const metadata: Metadata = {
  title: "Signing you in | Investigation Flow",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function AuthCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
