'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * List of exact pathnames that contain forms and should NOT display the chatbot.
 */
const EXCLUDED_EXACT_ROUTES = new Set([
  '/contact',
  '/contact-us',
  '/schedule-tour',
  '/book-a-tour',
  '/support',
  '/interest',
  '/campinterest',
  '/robotics-enrollment',
  '/checkout',
  '/payment',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
]);

/**
 * Route prefixes where the chatbot should be excluded (contain forms/portals).
 */
const EXCLUDED_ROUTE_PREFIXES = [
  '/admin',
  '/dashboard',
  '/mobile',
];

/**
 * Helper to determine whether the current route has forms.
 */
export function isFormPage(pathname: string | null): boolean {
  if (!pathname) return false;
  // Normalize pathname (remove trailing slash except for root)
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (EXCLUDED_EXACT_ROUTES.has(normalized)) {
    return true;
  }

  if (EXCLUDED_ROUTE_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return true;
  }

  // Job application forms at /careers/[id]
  if (normalized.startsWith('/careers/') && normalized !== '/careers') {
    return true;
  }

  return false;
}

const SCRIPT_ID = 'leadconnector-chat-widget-loader';

export default function LeadConnectorChatbot() {
  const pathname = usePathname();

  useEffect(() => {
    const hasForm = isFormPage(pathname);

    const hideChatbot = () => {
      const chatElements = document.querySelectorAll<HTMLElement>(
        'chat-widget, .chat-widget, iframe[src*="chat-widget"]'
      );
      chatElements.forEach((el) => {
        el.style.setProperty('display', 'none', 'important');
      });
    };

    const showChatbot = () => {
      const chatElements = document.querySelectorAll<HTMLElement>(
        'chat-widget, .chat-widget, iframe[src*="chat-widget"]'
      );
      chatElements.forEach((el) => {
        el.style.removeProperty('display');
      });
    };

    if (hasForm) {
      // Hide any existing chatbot elements on form pages
      hideChatbot();

      // In case loader is asynchronously injecting, observe body and hide if attached
      const observer = new MutationObserver(() => {
        hideChatbot();
      });

      observer.observe(document.body, { childList: true, subtree: true });
      return () => {
        observer.disconnect();
      };
    }

    // On pages WITHOUT forms:
    // 1. Unhide any existing chatbot
    showChatbot();

    // 2. Ensure the loader script is injected if not yet present
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute(
        'data-resources-url',
        'https://widgets.leadconnectorhq.com/chat-widget/loader.js'
      );
      script.setAttribute('data-widget-id', '6ad283bef56fd8562efe38f7');
      script.setAttribute('data-source', 'WEB_USER');
      script.async = true;
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
}
