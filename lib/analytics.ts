'use client';

import { sendGAEvent } from '@next/third-parties/google';

/**
 * Custom event tracking for Google Analytics 4 (GA4)
 */
export function trackEvent(action: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  try {
    sendGAEvent('event', action, params || {});
  } catch (error) {
    console.debug('[GA] Failed to track event:', action, error);
  }
}

/**
 * Tracks tour scheduling / appointment requests
 */
export function trackTourScheduled(data: {
  source: string;
  course?: string;
  slotId?: string;
}) {
  trackEvent('schedule_tour', {
    event_category: 'Engagement',
    event_label: data.source,
    source: data.source,
    course_interest: data.course,
    slot_id: data.slotId,
  });

  // Also send recommended standard GA4 event
  trackEvent('generate_lead', {
    currency: 'USD',
    value: 1,
    lead_type: 'tour_booking',
  });
}

/**
 * Tracks contact interaction clicks (phone call, email click)
 */
export function trackContactClick(method: 'phone' | 'email', value: string) {
  trackEvent('contact_click', {
    event_category: 'Contact',
    contact_method: method,
    contact_target: value,
  });
}
