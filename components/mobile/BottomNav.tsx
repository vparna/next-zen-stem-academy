'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Home',
      icon: '🏠',
      path: '/mobile',
    },
    {
      label: 'QR Code',
      icon: '📷',
      path: '/mobile/qr-code',
    },
    {
      label: 'Messages',
      icon: '💬',
      path: '/mobile/chat',
    },
    {
      label: 'Billing',
      icon: '💳',
      path: '/mobile/billing',
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.04)] z-50">
      <nav className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'scale-110 -translate-y-1' 
                  : 'hover:bg-gray-50 active:scale-95'
              }`}
            >
              <div className={`text-2xl mb-1 transition-transform duration-300 ${isActive ? 'drop-shadow-md' : 'opacity-60 grayscale'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${
                isActive ? 'text-indigo-600' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
