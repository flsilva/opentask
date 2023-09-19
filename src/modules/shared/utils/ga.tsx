'use client';

import 'client-only';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export const gaPageWiew = (id: string, url: string) => {
  if (!window.gtag) return;
  window.gtag('config', id, {
    page_path: url,
  });
};

export const gaEvent = (
  action: (string & {}) | Gtag.EventNames,
  eventParams: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams | undefined,
) => {
  if (!window.gtag) return;
  window.gtag('event', action, eventParams);
};

export interface GaNextNavigationProps {
  readonly gaId: string;
}

export const useGaNextNavigation = ({ gaId }: GaNextNavigationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams.toString() !== '' ? `?${searchParams}` : ''}`;
    gaPageWiew(gaId, url);
  }, [gaId, pathname, searchParams]);
};

export const GaNextNavigation = ({ gaId }: GaNextNavigationProps) => {
  useGaNextNavigation({ gaId });
  return null;
};

export interface GaNextScriptProps extends GaNextNavigationProps {
  readonly async?: boolean;
  readonly scriptId?: string;
}

export const GaNextScript = ({
  async = true,
  gaId,
  scriptId = 'google-analytics',
}: GaNextScriptProps) => (
  <>
    <Script async={async} src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    <Script id={scriptId}>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gaId}');
      `}
    </Script>
  </>
);

export const GaNextScriptNavigation = ({ async, gaId, scriptId }: GaNextScriptProps) => (
  <>
    <GaNextScript async={async} gaId={gaId} scriptId={scriptId} />
    <GaNextNavigation gaId={gaId} />
  </>
);
