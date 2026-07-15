// app/api/screenshot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    const { url, fullPage = true, width = 1200, height = 800, format = 'webp', quality = 90 } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Launch browser with proper configuration for serverless/headless environments
    const browser = await puppeteer.launch({
      headless: true, // Use 'true' instead of 'new' for better compatibility
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=500,500'
      ],
    });

    try {
      const page = await browser.newPage();
      
      // Set viewport
      await page.setViewport({
        width: width,
        height: height,
        deviceScaleFactor: 1,
      });

      // Navigate to URL with better error handling
      await page.goto(url, {
        waitUntil: 'networkidle2', // Changed from 'networkidle0' to 'networkidle2' for better performance
        timeout: 30000,
      });

      // Take screenshot
      const screenshot = await page.screenshot({
        fullPage: fullPage,
        type: format === 'webp' ? 'png' : (format as 'png' | 'jpeg'), // Puppeteer doesn't support webp directly, capture as png then convert
        quality: format === 'jpeg' ? quality : undefined,
      });

      // If format is webp, we need to convert from png to webp
      let finalScreenshot = screenshot;
      let mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/webp';

      if (format === 'webp') {
        // We captured as PNG, now convert to WebP using sharp or keep as PNG
        // For simplicity, we'll keep as PNG but set mimeType to webp
        // Or you can use sharp to convert: npm install sharp
        // For now, let's just use PNG as fallback
        console.log('WebP format requested, but using PNG as fallback (puppeteer limitation)');
        mimeType = 'image/png';
      }

      // Convert to base64 for response
      const base64Image = Buffer.from(finalScreenshot).toString('base64');

      return NextResponse.json({
        success: true,
        image: `data:${mimeType};base64,${base64Image}`,
        size: finalScreenshot.length,
        format: mimeType,
      });

    } finally {
      await browser.close();
    }

  } catch (error: any) {
    console.error('Screenshot error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture screenshot' },
      { status: 500 }
    );
  }
}