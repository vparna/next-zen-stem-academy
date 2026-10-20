'use client';

import { useEffect } from 'react';

interface LeadConnectorBookingProps {
  className?: string;
  minHeight?: string;
}

export default function LeadConnectorBooking({
  className = '',
  minHeight = '700px',
}: LeadConnectorBookingProps) {
  useEffect(() => {
    const scriptId = 'msgsndr-form-embed-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden rounded-[2.5rem] bg-white p-4 sm:p-6 md:p-8 border border-slate-100 shadow-xl ${className}`}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/1l73ZV1vqxdvNkAp5aeV"
        allow="payment"
        style={{
          width: '100%',
          border: 'none',
          overflow: 'hidden',
          minHeight,
        }}
        scrolling="no"
        id="okbMjc1MPcyNNeasZVkV_1792181068448"
        title="Book a Tour"
      />
    </div>
  );
}
