'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const hiddenPathPrefixes = ['/admin', '/dashboard', '/login', '/signup', '/forgot-password', '/reset-password', '/mobile'];
const STORAGE_KEY = 'nextzen_foundation_promo_dismissed';

export default function FoundationPromotionModal() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const shouldHide = useMemo(
    () => hiddenPathPrefixes.some((prefix) => pathname?.startsWith(prefix)),
    [pathname]
  );

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  useEffect(() => {
    if (shouldHide) return;

    const isDismissed = sessionStorage.getItem(STORAGE_KEY);
    const timer = setTimeout(() => {
      setIsReady(true);
      if (isDismissed) {
        setIsMinimized(true);
      } else {
        setIsOpen(true);
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [shouldHide]);

  // Lock body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleDismiss]);

  const handleClaimOffer = (target: string) => {
    handleDismiss();
    if (target.startsWith('/#')) {
      if (pathname === '/') {
        const id = target.replace('/#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      router.push(target);
    } else {
      router.push(target);
    }
  };

  if (!isReady || shouldHide) {
    return null;
  }

  return (
    <>
      {/* Floating Re-Open Badge when dismissed / minimized */}
      {isMinimized && !isOpen && (
        <aside
          role="region"
          aria-label="Promotion reminder"
          className="fixed bottom-5 left-5 z-40 animate-bounce hover:animate-none group cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
        >
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#1f2e57] via-[#0f172a] to-[#1f2e57] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border-2 border-[#FFB900]/50 hover:border-[#FFB900] transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB900] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFB900]" />
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#FFB900]">
                10% OFF PROMOTION
              </span>
              <span className="text-[11px] font-bold text-slate-300 hidden sm:inline">
                • Foundation Family Offer
              </span>
            </div>
            <span className="text-xs font-bold text-white/80 group-hover:translate-x-0.5 transition-transform">
              ✨
            </span>
          </div>
        </aside>
      )}

      {/* Promotion Modal Overlay & Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="foundation-promo-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden bg-black/60 transition-all duration-300 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleDismiss();
          }}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-300 scale-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Multi-Color Brand Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#F25022] via-[#FFB900] via-[#7FBA00] to-[#00A4EF]" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              aria-label="Close promotion dialog"
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 cursor-pointer hover:rotate-90 active:scale-90"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header & Hero Banner - Compact */}
            <div className="relative bg-gradient-to-br from-[#1f2e57] via-[#16274b] to-[#0a1628] text-white pt-5 pb-4 px-5 text-center overflow-hidden">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FFB900] to-[#F25022] text-slate-950 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm mb-2">
                <span>🌟</span>
                <span>Founding Family Offer</span>
                <span>🌟</span>
              </div>

              {/* Main Headline */}
              <h2
                id="foundation-promo-title"
                className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight"
              >
                Foundation Family Promotion
              </h2>
            </div>

            {/* Core Offer Highlights Section - Compact */}
            <div className="p-4 sm:p-5 space-y-3 bg-[#FAF8F5]">
              {/* Primary Savings Hero Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 rounded-xl p-3.5 border border-[#FFB900]/60 shadow-sm text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#F25022] via-[#FF8C00] to-[#FFB900] bg-clip-text text-transparent">
                    10% OFF
                  </span>
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-black text-[#1f2e57] block leading-tight">
                      Tuition for a Whole Year
                    </span>
                    <span className="text-[11px] font-black text-[#F25022] block">
                      Save up to $200 / month
                    </span>
                  </div>
                </div>
              </div>

              {/* Urgency and Exclusivity Details Grid - Compact */}
              <div className="grid grid-cols-2 gap-2.5 text-left">
                {/* Condition 1: Exclusivity */}
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F25022] to-[#FFB900] flex items-center justify-center text-white text-sm flex-shrink-0">
                    👥
                  </div>
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block">
                      Availability
                    </span>
                    <span className="text-[11px] font-black text-[#1f2e57] leading-tight block">
                      First 20 Families
                    </span>
                  </div>
                </div>

                {/* Condition 2: Deadline */}
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A4EF] to-[#2563eb] flex items-center justify-center text-white text-sm flex-shrink-0">
                    📅
                  </div>
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block">
                      Enroll By
                    </span>
                    <span className="text-[11px] font-black text-[#1f2e57] leading-tight block">
                      December 31st
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Compact */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => handleClaimOffer('/#inquiry-form-section')}
                  className="w-full bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#7FBA00] hover:opacity-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider py-3 rounded-full shadow-md shadow-[#F25022]/25 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Claim Promotion &amp; Enroll Now</span>
                  <span className="font-sans font-bold">→</span>
                </button>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleClaimOffer('/schedule-tour')}
                    className="flex-1 bg-white hover:bg-slate-50 text-[#1f2e57] hover:text-[#00A4EF] font-bold text-[11px] uppercase tracking-wider py-2 px-3 rounded-full border border-slate-200 transition-all text-center cursor-pointer shadow-xs active:scale-95"
                  >
                    Schedule Campus Tour
                  </button>

                  <button
                    onClick={handleDismiss}
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 px-2.5 py-1.5 transition-colors cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle Footer Note - Compact */}
            <div className="bg-slate-50 border-t border-slate-200/60 py-2 px-4 text-center text-[9px] text-slate-500 font-medium">
              * Applied to monthly tuition upon enrollment by Dec 31st. Limited to first 20 families.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
