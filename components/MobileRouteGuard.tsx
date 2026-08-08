'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Define the routes that are allowed when running in the native mobile app
const ALLOWED_MOBILE_ROUTES = [
  '/mobile',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

export default function MobileRouteGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('@capacitor/core')
      .then(({ Capacitor }) => {
        // If it's running natively (Capacitor Android/iOS)
        if (Capacitor.isNativePlatform()) {
          // Check if the current pathname matches any of the allowed base routes
          const isAllowed = ALLOWED_MOBILE_ROUTES.some((route) =>
            pathname === route || pathname.startsWith(`${route}/`)
          );

          // If the user is on a web-only route (e.g. /courses, /about, /dashboard),
          // redirect them back to the mobile home.
          if (!isAllowed) {
            router.replace('/mobile');
          }
        }
      })
      .catch(() => {
        // Silently ignore if Capacitor isn't available
      });
  }, [pathname, router]);

  return null;
}
