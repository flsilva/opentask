'use client';

import 'client-only';
import { useContext, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { twMerge } from 'tailwind-merge';
import { buttonGreenClassName } from '@/features/shared/ui/control/button/buttonClassName';
import { IOSAddIcon } from '@/features/shared/ui/icon/IOSAddIcon';
import { IOSShareIcon } from '@/features/shared/ui/icon/IOSShareIcon';
import { Dialog } from '@/features/shared/ui/dialog/Dialog';
import { InstallPwaContext } from './InstallPwaProvider';

export const InstallPwaDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [os, setOS] = useState<string>();
  const installPrompt = useContext(InstallPwaContext);

  useEffect(() => {
    if (!window || !localStorage) return;

    const parser = new UAParser(window.navigator.userAgent);
    const browser = parser.getBrowser().name;
    const _os = parser.getOS().name;
    setOS(_os);

    let showedDate: string | null = null;
    let isRunningAsPwa: boolean = false;

    try {
      isRunningAsPwa = window.matchMedia('(display-mode: fullscreen)').matches;
      showedDate = localStorage.getItem('InstallPwaDialogShowedDate');
    } catch {}

    /*
     * We only want to show this Dialog once, if the web app is not running as a PWA already,
     * and if users are on Safari on iOS or Chrome on Android.
     */
    if (
      !showedDate &&
      !isRunningAsPwa &&
      ((_os === 'iOS' && browser === 'Mobile Safari') ||
        (_os === 'Android' && browser === 'Chrome' && installPrompt))
    ) {
      setIsOpen(true);
      /*
       * We want to set this here, so we can make sure we showed the Dialog,
       * and now it's safe to not show it anymore.
       */
      try {
        localStorage.setItem('InstallPwaDialogShowedDate', new Date().toString());
      } catch {}
      /**/
    }
    /**/
  }, [installPrompt]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} title="Add to Home Screen">
      <div className="flex flex-col">
        <p className="font-medium text-gray-800 mt-6">
          Add OpenTask to your home screen to have a better user experience and use it in
          fullscreen.
        </p>
        {os === 'iOS' && (
          <>
            <div className="flex items-center mt-6">
              <IOSShareIcon fill="#2998ff" />
              <p className="text-sm font-medium text-gray-800 ml-4 mt-2">
                1&#41; Tap the &quot;Share&quot; button
              </p>
            </div>
            <div className="flex items-center mt-4">
              <IOSAddIcon />
              <p className="text-sm font-medium text-gray-800 ml-4">
                2&#41; Tap &quot;Add to Home Screen&quot; button
              </p>
            </div>
          </>
        )}
        {os === 'Android' && (
          <button
            type="button"
            className={twMerge(buttonGreenClassName, 'flex justify-center mt-6')}
            onClick={() => {
              if (installPrompt) installPrompt();
              setIsOpen(false);
            }}
          >
            Add to Home Screen
          </button>
        )}
      </div>
    </Dialog>
  );
};
