'use client';

import 'client-only';
import { Fragment, useContext, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { Dialog, Transition } from '@headlessui/react';
import { buttonClassNameGreen } from '@/app/modules/common/button/buttonClassName';
import { IOSAddIcon } from '@/app/modules/common/icon/IOSAddIcon';
import { IOSShareIcon } from '@/app/modules/common/icon/IOSShareIcon';
import { XIcon } from '@/app/modules/common/icon/XIcon';
import { PwaPromptContext } from './PwaPromptProvider';

export default function PwaPromptModal() {
  const [isOpen, setIsOpen] = useState(false);
  const parser = new UAParser(window.navigator.userAgent);
  const os = parser.getOS().name;
  const browser = parser.getBrowser().name;
  const pwaPrompt = useContext(PwaPromptContext);

  /*
   * We need to set isOpen inside the useEffect otherwise the initial mount animation
   * doesn't work, even after adding "appear".
   */
  useEffect(() => {
    let showedDate: string | null = null;
    let isRunningAsPwa: boolean = false;

    try {
      isRunningAsPwa = window.matchMedia('(display-mode: fullscreen)').matches;
      showedDate = localStorage.getItem('pwaPromptModalShowedDate');
    } catch {}

    /*
     * We only want to show this modal once, if the web app is not running as a PWA already,
     * and if users are on Safari on iOS or Chrome on Android.
     */
    if (
      !showedDate &&
      !isRunningAsPwa &&
      ((os === 'iOS' && browser === 'Mobile Safari') ||
        (os === 'Android' && browser === 'Chrome' && pwaPrompt))
    ) {
      setIsOpen(true);
      /*
       * We want to set this here, so we can make sure we showed the modal,
       * and now it's safe to not show it anymore.
       */
      try {
        localStorage.setItem('pwaPromptModalShowedDate', new Date().toString());
      } catch {}
      /**/
    }
    /**/
  }, [browser, os, pwaPrompt]);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Transition show={isOpen} as="div">
      <Dialog as="div" className="relative z-50" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="flex fixed left-0 right-0 bottom-0  h-80">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
          >
            <Dialog.Panel className="mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-800">Add to Home Screen</h1>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={onCloseModal}
                >
                  <span className="sr-only">Close modal</span>
                  <XIcon aria-hidden="true" />
                </button>
              </div>
              <p className="font-medium text-gray-800 mt-6">
                Add OpenTask.app to your home screen to have a better user experience and use it in
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
                  className={`${buttonClassNameGreen} flex justify-center mt-6`}
                  onClick={() => {
                    if (pwaPrompt) pwaPrompt();
                    onCloseModal();
                  }}
                >
                  Add to Home Screen
                </button>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
