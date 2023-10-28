'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';

interface ModalProps extends ChildrenProps {
  readonly appear?: boolean;
  readonly initialFocusRef?: React.MutableRefObject<HTMLInputElement | null>;
  readonly onCloseHandler: () => void;
  readonly open: boolean;
}

export const Modal = ({ appear, children, initialFocusRef, onCloseHandler, open }: ModalProps) => {
  return (
    <Transition appear={appear} show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={initialFocusRef}
        onClose={onCloseHandler}
      >
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
        <div className="flex fixed inset-0 md:items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-[200px] md:translate-y-0 md:scale-95"
          >
            <Dialog.Panel className="flex flex-col mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem]">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
