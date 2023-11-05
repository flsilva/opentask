'use client';

import 'client-only';
import { useContext, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { buttonGreenClassName } from '@/modules/shared/controls/button/buttonClassName';
import { IOSAddIcon } from '@/modules/shared/icons/IOSAddIcon';
import { IOSShareIcon } from '@/modules/shared/icons/IOSShareIcon';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { InstallPwaContext } from './InstallPwaProvider';

export const InstallPwaDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const parser = new UAParser(window.navigator.userAgent);
  const os = parser.getOS().name;
  const browser = parser.getBrowser().name;
  const installPrompt = useContext(InstallPwaContext);

  /*
   * We need to set isOpen inside the useEffect otherwise the initial mount animation
   * doesn't work, even after adding "appear".
   */
  useEffect(() => {
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
      ((os === 'iOS' && browser === 'Mobile Safari') ||
        (os === 'Android' && browser === 'Chrome' && installPrompt))
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
  }, [browser, os, installPrompt]);

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
            className={`${buttonGreenClassName} flex justify-center mt-6`}
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
