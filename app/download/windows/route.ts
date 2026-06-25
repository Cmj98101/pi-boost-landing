import { NextResponse } from "next/server";

// On-brand download link: visitors hit investigationflow.com/download/windows
// and get redirected to the hosted Windows installer. Swapping the file or
// version is just a change to NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL.
export function GET() {
  const url = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL;
  if (!url) {
    return new NextResponse("Windows download is not available yet.", {
      status: 404,
    });
  }
  return NextResponse.redirect(url, 302);
}
