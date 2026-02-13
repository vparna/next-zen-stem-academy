// Script to generate a preview version of the banner
// Usage: node marketing/generate-banner-preview.js

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateBannerPreview() {
  console.log('Starting banner preview generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to scaled-down version (1/10 scale = 1440px x 360px)
    await page.setViewport({
      width: 1440,
      height: 360,
      deviceScaleFactor: 1,
    });

    const htmlPath = path.join(__dirname, 'banner-8x2.html');
    const htmlFile = 'file://' + htmlPath;
    
    console.log('Loading HTML file:', htmlPath);
    await page.goto(htmlFile, { waitUntil: 'networkidle0' });

    // Wait a bit for animations to settle
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate preview JPEG
    const previewPath = path.join(__dirname, 'banner-8x2-preview.jpeg');
    await page.screenshot({
      path: previewPath,
      type: 'jpeg',
      quality: 90,
      fullPage: false,
    });
    console.log('Preview banner created:', previewPath);

    const previewStats = fs.statSync(previewPath);
    console.log(`Preview size: ${(previewStats.size / 1024).toFixed(2)} KB`);

    console.log('\nBanner preview generated successfully!');
    console.log('Preview dimensions: 1440 x 360 pixels (1/10 scale)');
    
  } catch (error) {
    console.error('Error generating banner preview:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

generateBannerPreview().catch(console.error);
