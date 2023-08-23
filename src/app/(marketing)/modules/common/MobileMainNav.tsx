'use client';

import 'client-only';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import MainNav from './MainNav';

interface MobileMainNavProps {
  readonly isOpen: boolean;
  readonly callback?: () => void;
}

export default function MobileMainNav({ callback, isOpen }: MobileMainNavProps) {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition-[height] duration-[400ms]"
      enterFrom="h-0"
      enterTo="opacity-100 h-[300px]"
      leave="transition-[height] duration-200 ease-in-out"
      leaveFrom="opacity-100 h-[300px]"
      leaveTo="h-0"
    >
      <div className="flex flex-col grow overflow-hidden divide-y divide-gray-500/10">
        <div className="space-y-2 py-6">
          <MainNav callback={callback} />
        </div>
        <div className="py-6">
          <Link
            href="/auth/sign-in"
            className="-mx-3 block px-3 py-2.5 text-base font-medium leading-7 text-gray-900"
          >
            Log in
          </Link>
        </div>
      </div>
    </Transition>
  );
}
