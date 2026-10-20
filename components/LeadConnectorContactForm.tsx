'use client';

import { useEffect } from 'react';

interface LeadConnectorContactFormProps {
  className?: string;
  minHeight?: string;
}

export default function LeadConnectorContactForm({
  className = '',
  minHeight = '650px',
}: LeadConnectorContactFormProps) {
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
    <div className={`w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 ${className}`}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/1uqMuse7xl8di6vpx8UD"
        style={{
          width: '100%',
          height: '100%',
          minHeight,
          border: 'none',
          borderRadius: '8px',
        }}
        id="inline-1uqMuse7xl8di6vpx8UD"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Book a Tour"
        data-height="1434"
        data-layout-iframe-id="inline-1uqMuse7xl8di6vpx8UD"
        data-form-id="1uqMuse7xl8di6vpx8UD"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title="Contact Us Form"
      />
    </div>
  );
}
