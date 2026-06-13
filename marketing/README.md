# NextZen STEM Academy Marketing Materials

This folder contains marketing materials for NextZen STEM Academy, including flyers, banners, promotional content, and QR codes for print and digital campaigns.

## 📋 Contents

---

### 🌟 NEW: Official Marketing Flyer (`flyer-nextzen-stem-academy.*`)
The official NextZen STEM Academy marketing flyer matching the approved brand design:
- **Design**: Deep blue space-themed header, sky/nature gradient body, teal footer
- **Content**:
  - **NextZen STEM Academy** logo with lotus + atom icon
  - **Tagline**: *"Ancient Wisdom. Modern STEM. Future Leaders."*
  - **Three programs**: Preschool & Pre-K | STEM Programs (Ages 4–14) | Hands-On Learning & Mindfulness
  - **Four activities**: Robotics & Coding | Creative Arts | Math & Science Labs | Outdoor Exploration
  - **"OPENING SOON"** call-to-action with "Schedule a Tour Today!"
  - **Contact**: Woodinville/Bothell, WA | (425) 325-0431 | www.NextZenAcademy.com
- **Available formats**:
  - `flyer-nextzen-stem-academy.html` – Editable source file
  - `flyer-nextzen-stem-academy.jpeg` – Ready-to-share image (850px wide)

---

### 🧾 NEW: Quick Print Pamphlets (`pamphlet-covered-play-area.html`, `pamphlets-print-sheet.html`)
Two ready-to-print pamphlet layouts inspired by your location-focused sample:
- `pamphlet-covered-play-area.html`
  - Single large pamphlet design for direct printing
  - Includes heading, photo-grid placeholders, location map panel, phone and full address strip
- `pamphlets-print-sheet.html`
  - 4-up printable sheet (2x2) for quick bulk handouts
  - Print once, cut into 4 pamphlets, and distribute immediately
- **Print tip**: open in browser → Print → enable “Background graphics” for best color output

---

### 🖼️ NEW: 8ft × 2ft Landscape Banner (`banner-8x2ft.*`)
A wide-format print-ready banner for events, storefronts and trade shows:
- **Dimensions**: 8 feet wide × 2 feet tall (96" × 24")
- **Print resolution**: 14400 × 3600 px at 150 DPI
- **HTML preview**: 1440 × 360 px (4:1 ratio)
- **Layout** (3-column landscape):
  - **Left column**: NextZen logo + tagline on deep blue space background
  - **Center column**: Three program circles (top) + four activity icons strip (bottom)
  - **Right column**: "OPENING SOON" CTA + contact footer on green nature background
- **Available formats**:
  - `banner-8x2ft.html` – Editable source file
  - `banner-8x2ft.jpeg` – Print-ready JPEG

**Best for**: Trade show booths, school entrance banners, community center displays, retail window signage

---

### 🟩 NEW: 3ft 11in × 3ft 11in Square Banner (`banner-square-47x47in.*`)
A square format banner with **6 mounting grommet holes** for banner frames and pop-up stands:
- **Dimensions**: 3 feet 11 inches × 3 feet 11 inches (47" × 47")
- **Print resolution**: 7050 × 7050 px at 150 DPI
- **HTML preview**: 700 × 700 px (1:1 ratio)
- **Grommet holes** (6 total for secure mounting):
  - Top-left corner
  - **Top-center** (midpoint of top edge)
  - Top-right corner
  - Bottom-left corner
  - **Bottom-center** (midpoint of bottom edge)
  - Bottom-right corner
- **Layout**: Same content sections as the flyer, adapted for square format
- **Available formats**:
  - `banner-square-47x47in.html` – Editable source file
  - `banner-square-47x47in.jpeg` – Print-ready JPEG

**Best for**: Banner frames, A-frame stands, hanging displays, entrance posts, pole banners

---

### ℹ️ Original Banner – 8ft × 2ft (`banner-8x2.*`)
A professional, high-resolution banner designed for printing and display:
- **Dimensions**: 8 feet wide × 2 feet tall (96" × 24")
- **Resolution**: 14400 × 3600 pixels at 150 DPI (print-ready quality)
- **Features**:
  - **Next Zen Academy logo** with modern design
  - **"COMING SOON!" message** in bold, eye-catching gold styling
  - **3S Philosophy tagline**: Skills • Science • Success
  - **Three main courses** displayed prominently:
    - Robotics 🤖 - Build & program robots
    - Mathematics 🔢 - Master math concepts
    - Chess ♟️ - Strategic thinking
  - **Contact information** at the bottom
  - **Gradient purple background** with subtle animations
- **Available formats**:
  - `banner-8x2.html` - Source HTML file (editable)
  - `banner-8x2.jpeg` - JPEG format (1.2 MB, recommended for most uses)
  - `banner-8x2.png` - PNG format (12 MB, highest quality)
  - `banner-8x2-preview.jpeg` - Preview version (1440×360px for quick viewing)

**Usage**: Perfect for:
- Trade shows and educational fairs
- School displays and bulletin boards
- Store fronts and community centers
- Print shops (high-resolution, print-ready)
- Digital displays and projectors

**Regenerating the banner**: If you modify the HTML file:
```bash
# Generate full-size banner images
node marketing/generate-banner-image.js

# Generate preview version
node marketing/generate-banner-preview.js
```

### 2. Marketing Flyer (`flyer.html` and `flyer.jpeg`)
A beautiful, professional WhatsApp marketing flyer featuring:
- **Next Zen Academy logo** prominently displayed
- **"Coming Soon" banner** prominently featured to create excitement
- **Three main courses**: 
  - Robotics 🤖 - Kids building and programming robots
  - Mathematics 🔢 - Children mastering math concepts
  - Science Lab 🔬 - Students conducting experiments
- **Small QR Code** that directs users to the interest expression page
- **Eye-catching design** with gradient backgrounds and animations
- **Benefits section** highlighting our 3S Philosophy
- **Updated contact information**:
  - Email: admin@nextzenacademy.com
  - Phone: (425) 374-1463
  - Website: www.nextzenacademy.com
- **Available in JPEG format** (`flyer.jpeg`) ready for sharing

### 3. Interest Page (`/interest`)
A dedicated webpage where users land after scanning the QR code:
- **Course showcase** with detailed descriptions
- **Interest form** to collect lead information
- **Database integration** to store interested leads
- **Responsive design** that works on all devices
- **Success confirmation** after form submission

## 🚀 How to Use the Flyer

### Option 1: View in Browser
1. Open the flyer in any web browser:
   ```bash
   # Navigate to the marketing folder
   cd marketing
   
   # Open flyer.html in your default browser
   open flyer.html  # On macOS
   xdg-open flyer.html  # On Linux
   start flyer.html  # On Windows
   ```

2. The flyer will automatically generate a QR code linking to your interest page

### Option 2: Convert to PDF for WhatsApp
1. Open `flyer.html` in a web browser
2. Right-click and select "Print" or press `Ctrl+P` (Windows/Linux) or `Cmd+P` (macOS)
3. Choose "Save as PDF" as the destination
4. Save the PDF as `next-zen-academy-flyer.pdf`
5. Share this PDF on WhatsApp, email, or social media

### Option 3: Use Pre-generated JPEG (Recommended)
The flyer is already available as a high-quality JPEG file:
1. Simply use `flyer.jpeg` for immediate sharing
2. The JPEG is optimized at 95% quality (212 KB)
3. Dimensions: 1280x1614 pixels
4. Perfect for WhatsApp, email, and social media

### Option 4: Convert to Image (if you modify the HTML)
1. Open `flyer.html` in a web browser
2. Use a screenshot tool or browser extension to capture the full page
3. Recommended tools:
   - **Chrome/Edge**: Built-in "Capture full size screenshot" in DevTools
   - **Firefox**: Built-in screenshot tool
   - **Browser extensions**: Full Page Screen Capture, Fireshot
4. Save as PNG or JPEG for easy sharing on WhatsApp

### Option 5: Regenerate JPEG from HTML
If you modify the HTML and need to regenerate the JPEG:
```bash
# Make sure dependencies are installed
npm install

# The flyer uses a pre-generated QR code (qr-code.png)
# If you need to regenerate the QR code:
node marketing/generate-qr.js https://nextzenacademy.com/interest

# Then use a browser automation tool or screenshot utility to convert HTML to JPEG
```

## 📱 QR Code Configuration

The QR code is pre-generated and embedded as a static image (`qr-code.png`) in the flyer.
- **URL**: https://nextzenacademy.com/interest
- **Size**: Smaller than previous version (120x120px in the flyer)
- **Format**: PNG with high error correction
- **Location**: Prominently displayed with "Coming Soon" banner above it

### Regenerating the QR Code
If you need to update the QR code URL, use the generation script:

```bash
# From the project root directory
node marketing/generate-qr.js https://your-new-url.com/interest
```

This will create both PNG and SVG versions of the QR code in the marketing folder.

## 📊 Lead Tracking

All leads captured through the QR code are stored in MongoDB under the `interests` collection with the following structure:

```javascript
{
  name: "Parent Name",
  email: "parent@email.com",
  phone: "+1234567890",
  course: "Robotics", // or "Chess", "Mathematics", "Multiple"
  childName: "Child Name",
  childAge: 10,
  message: "Additional message",
  status: "new",
  source: "marketing-flyer",
  createdAt: ISODate("2026-01-19...")
}
```

### Viewing Leads
Access leads through:
1. **MongoDB Compass**: Connect to your database and view the `interests` collection
2. **Admin Dashboard**: (Future feature) View and manage leads through the web interface
3. **Database Query**:
   ```javascript
   db.interests.find({ source: "marketing-flyer" }).sort({ createdAt: -1 })
   ```

## 🎨 Customization

### Changing Colors
Edit the CSS gradient colors in `flyer.html`:
```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Adjust these hex values to match your brand colors */
```

### Updating Contact Information
Find the footer section in `flyer.html` and update:
```html
<div class="contact-item">📧 admin@nextzenacademy.com</div>
<div class="contact-item">📱 (425) 374-1463</div>
<div class="contact-item">🌐 www.nextzenacademy.com</div>
```

### Adding More Courses
Add new course cards in the courses grid:
```html
<div class="course-card">
  <span class="course-icon">🎨</span>
  <h3 class="course-name">Art & Design</h3>
  <p class="course-description">Your description here</p>
</div>
```

## 📈 Best Practices for WhatsApp Marketing

1. **File Size**: Keep the PDF/image under 5MB for easy sharing
2. **Format**: PNG or PDF work best for WhatsApp
3. **Resolution**: Use at least 1080px width for clarity on mobile devices
4. **QR Code**: Ensure QR code is large enough to scan (minimum 200x200px)
5. **Testing**: Always test the QR code before mass distribution
6. **Tracking**: Monitor the `interests` collection to track campaign effectiveness

## 🔧 Technical Requirements

### For Development
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development server (if testing QR code functionality)
- Access to MongoDB (for storing leads)

### For Production
- Deployed Next.js application on Vercel or similar platform
- MongoDB Atlas or equivalent database
- Public URL for the interest page

### Security Note
The flyer HTML files load the QRCode.js library from a CDN for dynamic QR code generation. When converting to PDF or image for distribution, the QR code is embedded in the final output, so the CDN dependency is only needed during the conversion process, not by end users.

## 📞 Support

For questions or issues with marketing materials:
- Email: info@nextzenacademy.com
- Review the main README.md in the project root
- Check the deployment documentation

## 🎯 Campaign Tips

1. **WhatsApp Status**: Post the flyer as a status update
2. **WhatsApp Groups**: Share in relevant parent/education groups
3. **Direct Messages**: Send to interested parents directly
4. **Social Media**: Share on Facebook, Instagram, LinkedIn
5. **Email Campaigns**: Include in newsletters
6. **Print**: Print and display at local venues

## 📝 Notes

- The QR code is generated dynamically using the qrcode.js library
- The flyer is fully responsive and mobile-friendly
- All fonts and styles are self-contained (no external dependencies)
- The design follows modern UI/UX best practices
- Colors and branding match the Next Zen Academy website

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Created for**: Next Zen Academy Marketing Campaign
