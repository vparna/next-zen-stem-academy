/**
 * Geolocation Service
 * Handles location verification for check-ins
 */

export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface LocationPermissionState {
  granted: boolean;
  denied: boolean;
  prompt: boolean;
}

/**
 * Check geolocation permission status
 */
export async function checkLocationPermission(): Promise<LocationPermissionState> {
  if (!('permissions' in navigator)) {
    return { granted: false, denied: false, prompt: true };
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
    return {
      granted: result.state === 'granted',
      denied: result.state === 'denied',
      prompt: result.state === 'prompt',
    };
  } catch (error) {
    console.error('Failed to check location permission:', error);
    return { granted: false, denied: false, prompt: true };
  }
}

/**
 * Get current location
 */
export async function getCurrentLocation(): Promise<Location> {
  if (!('geolocation' in navigator)) {
    throw new Error('Geolocation is not supported by this browser');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        reject(new Error(`Failed to get location: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Calculate distance between two coordinates (in meters)
 * Using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Verify location is within acceptable range of school
 * Considers GPS accuracy to avoid false negatives
 */
export function verifyLocationInRange(
  currentLat: number,
  currentLon: number,
  schoolLat: number,
  schoolLon: number,
  maxDistanceMeters: number = 100,
  gpsAccuracy: number = 0
): boolean {
  const distance = calculateDistance(currentLat, currentLon, schoolLat, schoolLon);
  
  // If GPS accuracy is poor, add it to the acceptable range
  // This prevents false negatives due to GPS inaccuracy
  const effectiveRange = maxDistanceMeters + Math.min(gpsAccuracy, 50); // Cap accuracy bonus at 50m
  
  return distance <= effectiveRange;
}

/**
 * Store school location
 */
export function storeSchoolLocation(latitude: number, longitude: number): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('school_location', JSON.stringify({ latitude, longitude }));
  }
}

/**
 * Get stored school location
 */
export function getSchoolLocation(): { latitude: number; longitude: number } | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('school_location');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse school location:', error);
      }
    }
  }
  return null;
}

/**
 * Enable/disable location verification
 */
export function setLocationVerificationEnabled(enabled: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('location_verification_enabled', enabled ? 'true' : 'false');
  }
}

/**
 * Check if location verification is enabled
 */
export function isLocationVerificationEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const enabled = localStorage.getItem('location_verification_enabled');
    return enabled === 'true';
  }
  return false;
}
