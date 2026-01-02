/**
 * Photo Capture Service
 * Handles photo capture during check-in
 */

export interface CapturedPhoto {
  dataUrl: string;
  timestamp: number;
  childId?: string;
  attendanceId?: string;
}

/**
 * Check if camera is available
 */
export function isCameraAvailable(): boolean {
  return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
}

/**
 * Request camera permission
 */
export async function requestCameraPermission(): Promise<boolean> {
  if (!isCameraAvailable()) {
    throw new Error('Camera is not available on this device');
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'user' } 
    });
    // Stop the stream immediately after permission check
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Camera permission denied:', error);
    return false;
  }
}

/**
 * Capture photo from video stream
 */
export function capturePhotoFromVideo(videoElement: HTMLVideoElement): string {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to get canvas context');
  }

  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.8);
}

/**
 * Compress image data URL
 */
export function compressImage(dataUrl: string, maxWidth: number = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

/**
 * Store captured photo
 * Checks storage capacity before storing
 */
export function storePhoto(photo: CapturedPhoto): void {
  if (typeof window === 'undefined') return;

  try {
    // Check available storage space
    const estimatedSize = photo.dataUrl.length;
    const maxSize = 2 * 1024 * 1024; // 2MB per photo
    
    if (estimatedSize > maxSize) {
      console.warn('Photo too large to store locally. Consider compression.');
      return;
    }

    const key = `photo_${photo.timestamp}`;
    localStorage.setItem(key, JSON.stringify(photo));
    
    // Add to index
    const index = getPhotoIndex();
    index.push(key);
    localStorage.setItem('photo_index', JSON.stringify(index));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded. Cleaning up old photos...');
      cleanupOldPhotos();
      // Try storing again after cleanup
      try {
        const key = `photo_${photo.timestamp}`;
        localStorage.setItem(key, JSON.stringify(photo));
      } catch (retryError) {
        console.error('Failed to store photo even after cleanup:', retryError);
      }
    } else {
      console.error('Failed to store photo:', error);
    }
  }
}

/**
 * Get photo index
 */
function getPhotoIndex(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const index = localStorage.getItem('photo_index');
    return index ? JSON.parse(index) : [];
  } catch (error) {
    console.error('Failed to get photo index:', error);
    return [];
  }
}

/**
 * Get all stored photos
 */
export function getStoredPhotos(): CapturedPhoto[] {
  if (typeof window === 'undefined') return [];

  try {
    const index = getPhotoIndex();
    const photos: CapturedPhoto[] = [];

    for (const key of index) {
      const stored = localStorage.getItem(key);
      if (stored) {
        photos.push(JSON.parse(stored));
      }
    }

    return photos;
  } catch (error) {
    console.error('Failed to get stored photos:', error);
    return [];
  }
}

/**
 * Delete old photos (older than 30 days)
 */
export function cleanupOldPhotos(): void {
  if (typeof window === 'undefined') return;

  try {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const index = getPhotoIndex();
    const newIndex: string[] = [];

    for (const key of index) {
      const stored = localStorage.getItem(key);
      if (stored) {
        const photo: CapturedPhoto = JSON.parse(stored);
        if (photo.timestamp > thirtyDaysAgo) {
          newIndex.push(key);
        } else {
          localStorage.removeItem(key);
        }
      }
    }

    localStorage.setItem('photo_index', JSON.stringify(newIndex));
  } catch (error) {
    console.error('Failed to cleanup old photos:', error);
  }
}

/**
 * Enable/disable photo capture
 */
export function setPhotoCaptureEnabled(enabled: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('photo_capture_enabled', enabled ? 'true' : 'false');
  }
}

/**
 * Check if photo capture is enabled
 */
export function isPhotoCaptureEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const enabled = localStorage.getItem('photo_capture_enabled');
    return enabled === 'true';
  }
  return false;
}
