import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const hostname = request.headers.get("host");

  if (hostname === "pdfswift.online") {
    return NextResponse.redirect(
      `https://www.pdfswift.online${nextUrl.pathname}`,
      301
    );
  }
}
