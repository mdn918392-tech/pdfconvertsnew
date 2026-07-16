// app/api/screenshot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function POST(request: NextRequest) {
  let browser = null;
  
  try {
    const { url, fullPage = true, width = 1200, height = 800, format = 'webp', quality = 90 } = await request.json();

    console.log('📸 Screenshot request received:', { url, fullPage, width, height, format });

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format. Please enter a valid URL (e.g., example.com)' },
        { status: 400 }
      );
    }

    // Determine if running in production (Vercel) or development
    const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
    console.log('🚀 Environment:', isProduction ? 'Production (Vercel)' : 'Development');
    
    let launchOptions: any = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=500,500',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-web-security',
        '--disable-features=BlockInsecurePrivateNetworkRequests',
      ],
      headless: true,
      timeout: 30000,
    };

    if (isProduction) {
      try {
        console.log('🔍 Getting Chromium executable path...');
        const executablePath = await chromium.executablePath();
        console.log('✅ Chromium path found:', executablePath);
        launchOptions.executablePath = executablePath;
        launchOptions.args = [
          ...launchOptions.args,
          '--font-render-hinting=none',
          '--disable-font-subpixel-positioning',
          '--disable-optimize-fonts',
          '--disable-features=ImprovedFontHinting',
        ];
      } catch (chromiumError) {
        console.error('❌ Chromium executable error:', chromiumError);
        return NextResponse.json(
          { error: 'Screenshot service is temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
    } else {
      try {
        console.log('🔍 Finding local Chrome...');
        const chromePaths = [
          process.env.CHROME_PATH,
          '/usr/bin/google-chrome',
          '/usr/bin/chromium-browser',
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        ].filter(Boolean);

        const { existsSync } = await import('fs');
        let foundPath = null;
        for (const path of chromePaths) {
          if (path && existsSync(path)) {
            foundPath = path;
            break;
          }
        }

        if (foundPath) {
          console.log('✅ Chrome found at:', foundPath);
          launchOptions.executablePath = foundPath;
        } else {
          console.log('⚠️ No Chrome found, using default');
          launchOptions.executablePath = undefined;
        }
      } catch (error) {
        console.error('❌ Development Chrome detection error:', error);
        launchOptions.executablePath = undefined;
      }
    }

    console.log('🔧 Launching browser with options:', {
      args: launchOptions.args.length,
      executablePath: launchOptions.executablePath || 'default',
      headless: launchOptions.headless,
    });

    try {
      browser = await puppeteer.launch(launchOptions);
      console.log('✅ Browser launched successfully');
    } catch (launchError: any) {
      console.error('❌ Browser launch error:', launchError);
      return NextResponse.json(
        { error: `Failed to start browser: ${launchError.message || 'Unknown error'}` },
        { status: 503 }
      );
    }

    const page = await browser.newPage();
    console.log('✅ New page created');
    
    // Reduce viewport size for smaller screenshots
    await page.setViewport({
      width: Math.min(width, 1280), // Limit to 1280px
      height: Math.min(height, 800), // Limit to 800px
      deviceScaleFactor: 1, // Keep at 1 to reduce size
    });

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    console.log('✅ User agent set');

    console.log('🌐 Navigating to:', targetUrl);
    let response;
    try {
      response = await page.goto(targetUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });
      console.log('✅ Page loaded, status:', response?.status());
    } catch (navigationError: any) {
      console.error('❌ Navigation error:', navigationError);
      
      await browser.close();
      browser = null;

      if (navigationError.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        return NextResponse.json(
          { error: 'Website not found. Please check the URL and try again.' },
          { status: 404 }
        );
      } else if (navigationError.message?.includes('ERR_CONNECTION_REFUSED')) {
        return NextResponse.json(
          { error: 'Connection refused. The website might be down.' },
          { status: 503 }
        );
      } else if (navigationError.message?.includes('ERR_SSL')) {
        return NextResponse.json(
          { error: 'SSL error. The website might have security issues.' },
          { status: 503 }
        );
      } else if (navigationError.message?.includes('timeout')) {
        return NextResponse.json(
          { error: 'Website took too long to load. Try a different URL.' },
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { error: navigationError.message || 'Failed to load website' },
        { status: 500 }
      );
    }

    if (!response || !response.ok()) {
      await browser.close();
      browser = null;
      return NextResponse.json(
        { error: `Website returned error: ${response?.status() || 'Unknown'}` },
        { status: response?.status() || 500 }
      );
    }

    // Take screenshot with lower quality for smaller size
    console.log('📷 Taking screenshot...');
    let screenshot;
    let mimeType = 'image/webp';
    
    // Always use webp with lower quality for smaller size
    screenshot = await page.screenshot({
      fullPage: fullPage,
      type: 'webp',
      quality: Math.min(quality || 80, 80), // Max 80% quality
    });
    mimeType = 'image/webp';
    console.log('✅ Screenshot captured as WebP');

    await browser.close();
    browser = null;
    console.log('✅ Browser closed');

    // Check if screenshot is too large (> 4MB)
    if (screenshot.length > 4 * 1024 * 1024) {
      console.log('⚠️ Screenshot too large, compressing further...');
      // Convert to JPEG with lower quality
      const sharp = await import('sharp');
      screenshot = await sharp.default(screenshot)
        .jpeg({
          quality: 60,
          progressive: true,
        })
        .toBuffer();
      mimeType = 'image/jpeg';
      console.log('✅ Compressed to JPEG, size:', screenshot.length);
    }

    const base64Image = screenshot.toString('base64');
    console.log('✅ Image converted to base64, size:', screenshot.length);

    // Return with proper headers
    return new NextResponse(
      JSON.stringify({
        success: true,
        image: `data:${mimeType};base64,${base64Image}`,
        size: screenshot.length,
        format: mimeType,
        capturedUrl: targetUrl,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );

  } catch (error: any) {
    console.error('❌ Screenshot error:', error);
    
    if (browser) {
      try {
        await browser.close();
        console.log('✅ Browser closed after error');
      } catch (closeError) {
        console.error('❌ Error closing browser:', closeError);
      }
    }

    return NextResponse.json(
      { 
        error: error.message || 'Failed to capture screenshot. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}