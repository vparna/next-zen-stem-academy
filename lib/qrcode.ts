import QRCode from 'qrcode';

export async function generateQRCode(data: string): Promise<string> {
  try {
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 300,
      margin: 2,
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

export function generateQRData(type: 'child' | 'user', id: string): string {
  // Format: TYPE:ID:TIMESTAMP
  const timestamp = Date.now();
  return `${type.toUpperCase()}:${id}:${timestamp}`;
}

export function parseQRData(qrData: string): { type: string; id: string; timestamp: number } | null {
  try {
    const parts = qrData.split(':');
    if (parts.length !== 3) {
      return null;
    }
    
    const [type, id, timestampStr] = parts;
    const timestamp = parseInt(timestampStr, 10);
    
    if (isNaN(timestamp)) {
      return null;
    }
    
    return { type, id, timestamp };
  } catch (error) {
    return null;
  }
}
