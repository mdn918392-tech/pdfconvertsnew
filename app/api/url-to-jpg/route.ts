import { NextRequest, NextResponse } from 'next/server';
import { chromium, type Browser } from 'playwright';
import dns from 'dns/promises';
import net from 'net';

// ============================================================
// NEXT.JS RUNTIME
// ============================================================

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ============================================================
// CONFIGURATION
// ============================================================

const MAX_TIMEOUT = 45_000; // 45 seconds
const MAX_PAGE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
const MAX_SCREENSHOT_DIMENSION = 10_000; // px

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10;

// ============================================================
// BROWSER INSTANCE
// ============================================================

let browserInstance: Browser | null = null;

// ============================================================
// RATE LIMIT STORAGE
// ============================================================

const rateLimit = new Map<string, number[]>();

// ============================================================
// PRIVATE IP CHECK
// ============================================================

function isPrivateIP(ip: string): boolean {
  const normalized = ip
    .toLowerCase()
    .replace(/^::ffff:/, '');

  // ----------------------------------------------------------
  // IPv4
  // ----------------------------------------------------------

  if (net.isIPv4(normalized)) {
    const parts = normalized.split('.').map(Number);

    if (
      parts.length !== 4 ||
      parts.some((value) => Number.isNaN(value))
    ) {
      return true;
    }

    const [a, b] = parts;

    // 0.0.0.0/8
    if (a === 0) return true;

    // 10.0.0.0/8
    if (a === 10) return true;

    // 100.64.0.0/10 - Carrier Grade NAT
    if (a === 100 && b >= 64 && b <= 127) {
      return true;
    }

    // 127.0.0.0/8 - Loopback
    if (a === 127) return true;

    // 169.254.0.0/16 - Link local
    if (a === 169 && b === 254) {
      return true;
    }

    // 172.16.0.0/12
    if (a === 172 && b >= 16 && b <= 31) {
      return true;
    }

    // 192.0.0.0/24
    if (a === 192 && b === 0) {
      return true;
    }

    // 192.168.0.0/16
    if (a === 192 && b === 168) {
      return true;
    }

    // 198.18.0.0/15
    if (a === 198 && (b === 18 || b === 19)) {
      return true;
    }

    // Multicast
    if (a >= 224 && a <= 239) {
      return true;
    }

    // Reserved
    if (a >= 240) {
      return true;
    }

    return false;
  }

  // ----------------------------------------------------------
  // IPv6
  // ----------------------------------------------------------

  if (net.isIPv6(normalized)) {
    const lower = normalized.toLowerCase();

    // Loopback
    if (lower === '::1') {
      return true;
    }

    // Unspecified
    if (lower === '::') {
      return true;
    }

    // Link-local fe80::/10
    if (
      lower.startsWith('fe8') ||
      lower.startsWith('fe9') ||
      lower.startsWith('fea') ||
      lower.startsWith('feb')
    ) {
      return true;
    }

    // Unique local fc00::/7
    if (
      lower.startsWith('fc') ||
      lower.startsWith('fd')
    ) {
      return true;
    }

    // IPv4 mapped IPv6
    if (lower.startsWith('::ffff:')) {
      const mappedIPv4 = lower.substring(7);

      if (net.isIPv4(mappedIPv4)) {
        return isPrivateIP(mappedIPv4);
      }
    }

    return false;
  }

  // Unknown IP = unsafe
  return true;
}

// ============================================================
// DNS + SSRF PROTECTION
// ============================================================

async function isHostPrivate(
  hostname: string
): Promise<boolean> {
  try {
    // Direct IP
    if (net.isIP(hostname)) {
      return isPrivateIP(hostname);
    }

    // Resolve all addresses
    const addresses = await dns.lookup(hostname, {
      all: true,
      verbatim: true,
    });

    if (!addresses || addresses.length === 0) {
      return true;
    }

    // If ANY resolved IP is private, block it
    for (const address of addresses) {
      if (isPrivateIP(address.address)) {
        return true;
      }
    }

    return false;
  } catch {
    // DNS failure = unsafe
    return true;
  }
}

// ============================================================
// URL VALIDATION
// ============================================================

function validateUrl(
  urlString: string
): {
  valid: boolean;
  error?: string;
  parsed?: URL;
} {
  try {
    const url = new URL(urlString);

    // Only HTTP / HTTPS
    if (
      url.protocol !== 'http:' &&
      url.protocol !== 'https:'
    ) {
      return {
        valid: false,
        error:
          'Only HTTP and HTTPS URLs are supported.',
      };
    }

    const hostname = url.hostname.toLowerCase();

    if (!hostname) {
      return {
        valid: false,
        error: 'Invalid hostname.',
      };
    }

    // Block localhost
    const blockedHostnames = new Set([
      'localhost',
      'localhost.localdomain',
      '0.0.0.0',
      '127.0.0.1',
      '127.0.0.2',
      '::1',
      '[::1]',
    ]);

    if (blockedHostnames.has(hostname)) {
      return {
        valid: false,
        error:
          'Localhost URLs are not allowed.',
      };
    }

    // Direct private IP
    if (net.isIP(hostname)) {
      if (isPrivateIP(hostname)) {
        return {
          valid: false,
          error:
            'Private or internal IP addresses are not allowed.',
        };
      }
    }

    return {
      valid: true,
      parsed: url,
    };
  } catch {
    return {
      valid: false,
      error: 'Invalid URL format.',
    };
  }
}

// ============================================================
// GET CLIENT IP
// ============================================================

function getClientIP(req: NextRequest): string {
  const forwardedFor =
    req.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const firstIP = forwardedFor
      .split(',')[0]
      ?.trim();

    if (firstIP) {
      return firstIP;
    }
  }

  const realIP =
    req.headers.get('x-real-ip');

  if (realIP) {
    return realIP.trim();
  }

  return 'unknown';
}

// ============================================================
// RATE LIMIT CHECK
// ============================================================

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  const previousRequests =
    rateLimit.get(ip) || [];

  const recentRequests =
    previousRequests.filter(
      (timestamp) =>
        now - timestamp < RATE_LIMIT_WINDOW
    );

  if (
    recentRequests.length >=
    RATE_LIMIT_MAX
  ) {
    rateLimit.set(
      ip,
      recentRequests
    );

    return false;
  }

  recentRequests.push(now);

  rateLimit.set(
    ip,
    recentRequests
  );

  return true;
}

// ============================================================
// CLEAN RATE LIMIT MEMORY
// ============================================================

const cleanupTimer = setInterval(() => {
  const now = Date.now();

  for (const [
    ip,
    timestamps,
  ] of rateLimit.entries()) {
    const recent = timestamps.filter(
      (timestamp) =>
        now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recent.length === 0) {
      rateLimit.delete(ip);
    } else {
      rateLimit.set(ip, recent);
    }
  }
}, RATE_LIMIT_WINDOW);

// Prevent timer from keeping Node process alive
if (
  typeof cleanupTimer.unref === 'function'
) {
  cleanupTimer.unref();
}

// ============================================================
// GET /api/url-to-jpg
// ============================================================

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message:
      'URL to JPG API is ready',
  });
}

// ============================================================
// GET / PLAYWRIGHT BROWSER
// ============================================================

async function getBrowser(): Promise<Browser> {
  if (
    browserInstance &&
    browserInstance.isConnected()
  ) {
    return browserInstance;
  }

  browserInstance =
    await chromium.launch({
      headless: true,

      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-accelerated-2d-canvas',
        '--disable-pdf-viewer',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
      ],
    });

  return browserInstance;
}

// ============================================================
// POST /api/url-to-jpg
// ============================================================

export async function POST(
  req: NextRequest
) {
  let context:
    Awaited<
      ReturnType<Browser['newContext']>
    > | null = null;

  try {
    // --------------------------------------------------------
    // RATE LIMIT
    // --------------------------------------------------------

    const clientIP =
      getClientIP(req);

    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          error:
            'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
          },
        }
      );
    }

    // --------------------------------------------------------
    // PARSE BODY
    // --------------------------------------------------------

    let body: {
      url?: unknown;
      width?: unknown;
      mode?: unknown;
      quality?: unknown;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          error:
            'Invalid JSON request body.',
        },
        {
          status: 400,
        }
      );
    }

    const {
      url,
      width = 1440,
      mode = 'fullPage',
      quality = 0.85,
    } = body;

    // --------------------------------------------------------
    // URL REQUIRED
    // --------------------------------------------------------

    if (
      !url ||
      typeof url !== 'string'
    ) {
      return NextResponse.json(
        {
          error:
            'URL is required.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // URL LENGTH
    // --------------------------------------------------------

    if (url.length > 2048) {
      return NextResponse.json(
        {
          error:
            'URL is too long.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // VALIDATE URL
    // --------------------------------------------------------

    const urlValidation =
      validateUrl(url);

    if (
      !urlValidation.valid ||
      !urlValidation.parsed
    ) {
      return NextResponse.json(
        {
          error:
            urlValidation.error ||
            'Invalid URL.',
        },
        {
          status: 400,
        }
      );
    }

    const parsedUrl =
      urlValidation.parsed;

    // --------------------------------------------------------
    // SSRF CHECK
    // --------------------------------------------------------

    const hostname =
      parsedUrl.hostname;

    const privateHost =
      await isHostPrivate(hostname);

    if (privateHost) {
      return NextResponse.json(
        {
          error:
            'Access to internal or private networks is not allowed.',
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------------------------------
    // MODE VALIDATION
    // --------------------------------------------------------

    const validModes = [
      'fullPage',
      'viewportOnly',
    ];

    if (
      typeof mode !== 'string' ||
      !validModes.includes(mode)
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid screenshot mode.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // WIDTH VALIDATION
    // --------------------------------------------------------

    const numericWidth =
      Number(width);

    if (
      !Number.isFinite(
        numericWidth
      ) ||
      numericWidth < 200 ||
      numericWidth > 4000
    ) {
      return NextResponse.json(
        {
          error:
            'Width must be between 200 and 4000 pixels.',
        },
        {
          status: 400,
        }
      );
    }

    const viewportWidth =
      Math.round(numericWidth);

    // --------------------------------------------------------
    // QUALITY VALIDATION
    // --------------------------------------------------------

    const numericQuality =
      Number(quality);

    if (
      !Number.isFinite(
        numericQuality
      ) ||
      numericQuality < 0.1 ||
      numericQuality > 1
    ) {
      return NextResponse.json(
        {
          error:
            'Quality must be between 0.1 and 1.0.',
        },
        {
          status: 400,
        }
      );
    }

    const jpegQuality =
      Math.round(
        numericQuality * 100
      );

    // --------------------------------------------------------
    // GET BROWSER
    // --------------------------------------------------------

    const browser =
      await getBrowser();

    // --------------------------------------------------------
    // CREATE CONTEXT
    // --------------------------------------------------------

    context =
      await browser.newContext({
        viewport: {
          width: viewportWidth,
          height:
            mode === 'viewportOnly'
              ? 800
              : 1080,
        },

        deviceScaleFactor: 1,

        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',

        javaScriptEnabled: true,

        ignoreHTTPSErrors: false,
      });

    // --------------------------------------------------------
    // REQUEST FILTER / SSRF PROTECTION
    // --------------------------------------------------------

    await context.route(
      '**/*',
      async (route) => {
        try {
          const request =
            route.request();

          const requestUrl =
            request.url();

          // Browser internal resources
          if (
            requestUrl.startsWith(
              'data:'
            ) ||
            requestUrl.startsWith(
              'blob:'
            ) ||
            requestUrl.startsWith(
              'about:'
            )
          ) {
            await route.continue();
            return;
          }

          let requestURL: URL;

          try {
            requestURL =
              new URL(requestUrl);
          } catch {
            await route.abort();
            return;
          }

          // Only HTTP/HTTPS
          if (
            requestURL.protocol !==
              'http:' &&
            requestURL.protocol !==
              'https:'
          ) {
            await route.abort();
            return;
          }

          const requestHostname =
            requestURL.hostname;

          const requestIsPrivate =
            await isHostPrivate(
              requestHostname
            );

          if (requestIsPrivate) {
            await route.abort();
            return;
          }

          await route.continue();
        } catch {
          try {
            await route.abort();
          } catch {
            // Ignore route cleanup error
          }
        }
      }
    );

    // --------------------------------------------------------
    // CREATE PAGE
    // --------------------------------------------------------

    const page =
      await context.newPage();

    page.setDefaultTimeout(
      MAX_TIMEOUT
    );

    // --------------------------------------------------------
    // RESPONSE SIZE TRACKING
    // --------------------------------------------------------

    let totalResponseSize = 0;

    page.on(
      'response',
      (response) => {
        try {
          const contentLength =
            response
              .headers()[
              'content-length'
            ];

          if (contentLength) {
            const size =
              Number(
                contentLength
              );

            if (
              Number.isFinite(size)
            ) {
              totalResponseSize +=
                size;
            }
          }
        } catch {
          // Ignore header errors
        }
      }
    );

    // --------------------------------------------------------
    // NAVIGATE
    // --------------------------------------------------------

    try {
      await page.goto(url, {
        waitUntil:
          'domcontentloaded',
        timeout:
          MAX_TIMEOUT,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      if (
        message
          .toLowerCase()
          .includes('timeout')
      ) {
        return NextResponse.json(
          {
            error:
              'Website took too long to load. Please try again.',
          },
          {
            status: 504,
          }
        );
      }

      if (
        message.includes(
          'ERR_NAME_NOT_RESOLVED'
        ) ||
        message.includes(
          'ERR_CONNECTION'
        ) ||
        message.includes(
          'ERR_INTERNET'
        ) ||
        message.includes(
          'ERR_ADDRESS'
        )
      ) {
        return NextResponse.json(
          {
            error:
              'Website could not be reached. Please check the URL.',
          },
          {
            status: 400,
          }
        );
      }

      throw error;
    }

    // --------------------------------------------------------
    // WAIT FOR NETWORK TO SETTLE
    // --------------------------------------------------------

    try {
      await page.waitForLoadState(
        'networkidle',
        {
          timeout: 10_000,
        }
      );
    } catch {
      // Some websites never reach networkidle.
      // Continue anyway.
    }

    // Give lazy-loaded content time
    await page.waitForTimeout(
      1_500
    );

    // --------------------------------------------------------
    // CHECK PAGE RESOURCE SIZE
    // --------------------------------------------------------

    if (
      totalResponseSize >
      MAX_PAGE_SIZE_BYTES
    ) {
      return NextResponse.json(
        {
          error:
            'Website resources exceed the 20 MB limit.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // PAGE DIMENSIONS
    // --------------------------------------------------------

    let screenshotWidth =
      viewportWidth;

    let screenshotHeight = 800;

    if (mode === 'fullPage') {
      const dimensions =
        await page.evaluate(
          () => {
            const html =
              document.documentElement;

            const body =
              document.body;

            const width =
              Math.max(
                html?.scrollWidth ||
                  0,
                html?.clientWidth ||
                  0,
                body?.scrollWidth ||
                  0,
                body?.clientWidth ||
                  0
              );

            const height =
              Math.max(
                html?.scrollHeight ||
                  0,
                html?.clientHeight ||
                  0,
                body?.scrollHeight ||
                  0,
                body?.clientHeight ||
                  0
              );

            return {
              width,
              height,
            };
          }
        );

      screenshotWidth =
        dimensions.width;

      screenshotHeight =
        dimensions.height;

      // Prevent massive screenshots
      if (
        screenshotWidth >
          MAX_SCREENSHOT_DIMENSION ||
        screenshotHeight >
          MAX_SCREENSHOT_DIMENSION
      ) {
        return NextResponse.json(
          {
            error:
              'Page is too large to capture. Maximum dimension is 10,000 pixels.',
          },
          {
            status: 400,
          }
        );
      }

      if (
        screenshotWidth <= 0
      ) {
        screenshotWidth =
          viewportWidth;
      }

      if (
        screenshotHeight <= 0
      ) {
        screenshotHeight = 1080;
      }
    }

    // --------------------------------------------------------
    // SCREENSHOT
    // --------------------------------------------------------

    const screenshotBuffer =
      await page.screenshot({
        type: 'jpeg',

        quality:
          jpegQuality,

        fullPage:
          mode === 'fullPage',

        animations:
          'disabled',

        timeout:
          MAX_TIMEOUT,
      });

    // --------------------------------------------------------
    // SCREENSHOT SIZE
    // --------------------------------------------------------

    if (
      screenshotBuffer.length >
      MAX_PAGE_SIZE_BYTES
    ) {
      return NextResponse.json(
        {
          error:
            'Screenshot exceeds the 20 MB size limit. Try a lower quality or smaller page.',
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // IMPORTANT:
    // NextResponse does NOT accept Node Buffer directly
    // in your current Next.js TypeScript setup.
    //
    // Convert Buffer -> Uint8Array
    // ========================================================

    const imageBytes =
      new Uint8Array(
        screenshotBuffer
      );

    // --------------------------------------------------------
    // SUCCESS RESPONSE
    // --------------------------------------------------------

    return new NextResponse(
      imageBytes,
      {
        status: 200,

        headers: {
          'Content-Type':
            'image/jpeg',

          'Content-Disposition':
            'inline; filename="screenshot.jpg"',

          'Cache-Control':
            'no-store, no-cache, must-revalidate',

          'X-Image-Width': String(
            mode === 'fullPage'
              ? screenshotWidth
              : viewportWidth
          ),

          'X-Image-Height': String(
            mode === 'fullPage'
              ? screenshotHeight
              : 800
          ),

          'Content-Length': String(
            imageBytes.byteLength
          ),
        },
      }
    );
  } catch (error: unknown) {
    console.error(
      'URL-to-JPG unexpected error:',
      error
    );

    return NextResponse.json(
      {
        error:
          'Could not render the webpage. Please try again later.',
      },
      {
        status: 500,
      }
    );
  } finally {
    // --------------------------------------------------------
    // ALWAYS CLOSE CONTEXT
    // --------------------------------------------------------

    if (context) {
      try {
        await context.close();
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}