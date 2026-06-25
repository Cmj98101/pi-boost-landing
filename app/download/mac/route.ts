import { NextResponse } from "next/server";

// On-brand download link: visitors hit investigationflow.com/download/mac and
// get redirected to the hosted macOS installer. Swapping the file or version
// is just a change to NEXT_PUBLIC_MACOS_DOWNLOAD_URL — no button edits needed.
export function GET() {
  const url = process.env.NEXT_PUBLIC_MACOS_DOWNLOAD_URL;
  if (!url) {
    return new NextResponse("Mac download is not available yet.", {
      status: 404,
    });
  }
  return NextResponse.redirect(url, 302);
}
