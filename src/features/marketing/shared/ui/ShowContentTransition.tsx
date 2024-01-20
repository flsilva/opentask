'use client';

import { Transition } from '@headlessui/react';
import { ChildrenProps } from '@/features/shared/ui/ChildrenProps';

export const ShowContentTransition = ({ children }: ChildrenProps) => (
  <Transition
    appear
    show
    as="div"
    enter="ease-out duration-[400ms]"
    enterFrom="opacity-0 translate-y-[75px]"
    enterTo="opacity-100 translate-y-0"
    leave="ease-in duration-200"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-[75px]"
  >
    {children}
  </Transition>
);
