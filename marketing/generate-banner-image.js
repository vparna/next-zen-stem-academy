// Script to convert banner HTML to high-quality image
// Usage: node marketing/generate-banner-image.js

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateBannerImage() {
  console.log('Starting banner image generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to banner dimensions (8ft x 2ft = 14400px x 3600px at 150 DPI)
    await page.setViewport({
      width: 14400,
      height: 3600,
      deviceScaleFactor: 1,
    });

    const htmlPath = path.join(__dirname, 'banner-8x2.html');
    const htmlFile = 'file://' + htmlPath;
    
    console.log('Loading HTML file:', htmlPath);
    await page.goto(htmlFile, { waitUntil: 'networkidle0' });

    // Wait a bit for animations to settle
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate JPEG (smaller file size, good for printing)
    const jpegPath = path.join(__dirname, 'banner-8x2.jpeg');
    await page.screenshot({
      path: jpegPath,
      type: 'jpeg',
      quality: 95,
      fullPage: false,
    });
    console.log('JPEG banner created:', jpegPath);

    // Get file size
    const jpegStats = fs.statSync(jpegPath);
    console.log(`JPEG size: ${(jpegStats.size / 1024 / 1024).toFixed(2)} MB`);

    // Also generate PNG (higher quality, larger file)
    const pngPath = path.join(__dirname, 'banner-8x2.png');
    await page.screenshot({
      path: pngPath,
      type: 'png',
      fullPage: false,
    });
    console.log('PNG banner created:', pngPath);

    const pngStats = fs.statSync(pngPath);
    console.log(`PNG size: ${(pngStats.size / 1024 / 1024).toFixed(2)} MB`);

    console.log('\nBanner images generated successfully!');
    console.log('Dimensions: 14400 x 3600 pixels (8ft x 2ft at 150 DPI)');
    console.log('Files created:');
    console.log('  - banner-8x2.jpeg (for general use)');
    console.log('  - banner-8x2.png (for highest quality)');
    
  } catch (error) {
    console.error('Error generating banner image:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

generateBannerImage().catch(console.error);
