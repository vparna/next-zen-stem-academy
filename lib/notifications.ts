/**
 * Push Notification Service
 * Handles push notifications for check-in/out confirmations
 */

export interface NotificationPermissionState {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return { granted: false, denied: true, default: false };
  }

  const permission = await Notification.requestPermission();
  
  return {
    granted: permission === 'granted',
    denied: permission === 'denied',
    default: permission === 'default',
  };
}

/**
 * Check current notification permission
 */
export function checkNotificationPermission(): NotificationPermissionState {
  if (!('Notification' in window)) {
    return { granted: false, denied: true, default: false };
  }

  const permission = Notification.permission;
  
  return {
    granted: permission === 'granted',
    denied: permission === 'denied',
    default: permission === 'default',
  };
}

/**
 * Send a local notification
 */
export function sendLocalNotification(title: string, options?: NotificationOptions): void {
  const permission = checkNotificationPermission();
  
  if (!permission.granted) {
    console.warn('Notification permission not granted');
    return;
  }

  try {
    new Notification(title, {
      icon: '/logo-icon.svg',
      badge: '/logo-icon.svg',
      ...options,
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

/**
 * Send check-in confirmation notification
 */
export function sendCheckInNotification(childName: string, time: Date): void {
  sendLocalNotification('Check-In Confirmed', {
    body: `${childName} has been checked in at ${time.toLocaleTimeString()}`,
    tag: 'check-in',
    requireInteraction: false,
  });
}

/**
 * Send check-out confirmation notification
 */
export function sendCheckOutNotification(childName: string, time: Date): void {
  sendLocalNotification('Check-Out Confirmed', {
    body: `${childName} has been checked out at ${time.toLocaleTimeString()}`,
    tag: 'check-out',
    requireInteraction: false,
  });
}

/**
 * Store notification preference
 */
export function setNotificationPreference(enabled: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('notifications_enabled', enabled ? 'true' : 'false');
  }
}

/**
 * Get notification preference
 */
export function getNotificationPreference(): boolean {
  if (typeof window !== 'undefined') {
    const pref = localStorage.getItem('notifications_enabled');
    return pref !== 'false'; // Default to true
  }
  return true;
}

/**
 * Initialize notifications
 */
export async function initializeNotifications(): Promise<boolean> {
  const preference = getNotificationPreference();
  
  if (!preference) {
    return false;
  }

  const permission = checkNotificationPermission();
  
  if (permission.default) {
    const result = await requestNotificationPermission();
    return result.granted;
  }

  return permission.granted;
}
