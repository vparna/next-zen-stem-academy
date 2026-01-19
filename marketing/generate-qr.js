#!/usr/bin/env node

/**
 * Generate QR Code for Interest Page
 * 
 * This script generates a QR code image that links to the interest expression page.
 * The QR code can be used in printed materials, social media, or embedded in the flyer.
 * 
 * Usage:
 *   node generate-qr.js [url]
 * 
 * Example:
 *   node generate-qr.js https://nextzenacademy.com/interest
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Get URL from command line argument or use default
const url = process.argv[2] || 'http://localhost:3000/interest';

// Output file paths
const outputDir = path.join(__dirname);
const pngFile = path.join(outputDir, 'qr-code.png');
const svgFile = path.join(outputDir, 'qr-code.svg');

console.log('🔄 Generating QR code for:', url);

// Generate PNG version
QRCode.toFile(
  pngFile,
  url,
  {
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
    width: 400,
    margin: 2,
    errorCorrectionLevel: 'H'
  },
  (err) => {
    if (err) {
      console.error('❌ Error generating PNG:', err);
    } else {
      console.log('✅ PNG QR code saved to:', pngFile);
    }
  }
);

// Generate SVG version
QRCode.toString(
  url,
  {
    type: 'svg',
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
    width: 400,
    margin: 2,
    errorCorrectionLevel: 'H'
  },
  (err, svg) => {
    if (err) {
      console.error('❌ Error generating SVG:', err);
    } else {
      fs.writeFileSync(svgFile, svg);
      console.log('✅ SVG QR code saved to:', svgFile);
    }
  }
);

console.log('\n📱 QR Code Details:');
console.log('   URL:', url);
console.log('   Size: 400x400 pixels');
console.log('   Format: PNG and SVG');
console.log('   Error Correction: High (30%)');
console.log('\n💡 Tip: Scan the QR code to test before distributing!');
