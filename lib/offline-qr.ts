/**
 * Offline QR Code Generation and Storage
 * Allows QR code generation without internet connection
 */

import { generateQRData } from './qrcode';

export interface StoredQRCode {
  childId: string;
  childName: string;
  qrData: string;
  qrCodeImage: string;
  generatedAt: number;
  expiresAt: number;
}

const STORAGE_KEY = 'offline_qr_codes';
const QR_CODE_VALIDITY_HOURS = 8; // Reduced from 24 to 8 hours for better security

/**
 * Store QR code offline
 */
export function storeQRCodeOffline(
  childId: string,
  childName: string,
  qrCodeImage: string
): void {
  if (typeof window === 'undefined') return;

  try {
    const qrData = generateQRData('child', childId);
    const now = Date.now();
    const expiresAt = now + QR_CODE_VALIDITY_HOURS * 60 * 60 * 1000;

    const storedQR: StoredQRCode = {
      childId,
      childName,
      qrData,
      qrCodeImage,
      generatedAt: now,
      expiresAt,
    };

    const existing = getStoredQRCodes();
    const filtered = existing.filter((qr) => qr.childId !== childId);
    filtered.push(storedQR);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to store QR code offline:', error);
  }
}

/**
 * Get all stored QR codes
 */
export function getStoredQRCodes(): StoredQRCode[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const codes: StoredQRCode[] = JSON.parse(stored);
    const now = Date.now();

    // Filter out expired codes
    const valid = codes.filter((qr) => qr.expiresAt > now);

    // Update storage if any codes were removed
    if (valid.length !== codes.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
    }

    return valid;
  } catch (error) {
    console.error('Failed to get stored QR codes:', error);
    return [];
  }
}

/**
 * Get QR code for specific child
 */
export function getStoredQRCodeForChild(childId: string): StoredQRCode | null {
  const codes = getStoredQRCodes();
  return codes.find((qr) => qr.childId === childId) || null;
}

/**
 * Remove stored QR code
 */
export function removeStoredQRCode(childId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const codes = getStoredQRCodes();
    const filtered = codes.filter((qr) => qr.childId !== childId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove stored QR code:', error);
  }
}

/**
 * Clear all stored QR codes
 */
export function clearStoredQRCodes(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear stored QR codes:', error);
  }
}

/**
 * Check if offline mode is available
 */
export function isOfflineModeAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Get offline status
 */
export function isOnline(): boolean {
  if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
    return navigator.onLine;
  }
  return true;
}
