'use client';

import { Fragment, useEffect, useState } from 'react';
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@/modules/shared/icons/XIcon';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/modules/shared/controls/button/buttonClassName';

export interface ConfirmationModalProps {
  readonly cancelButtonLabel?: string;
  readonly confirmButtonLabel: string;
  readonly confirmButtonLabelSubmitting?: string;
  readonly modalBodyWrapper?: (children: React.ReactNode) => React.ReactNode;
  readonly modalCopy: string | React.ReactNode;
  readonly modalTitle: string | React.ReactNode;
  readonly onCancelHandler: () => void;
  readonly onConfirmHandler: (() => void) | 'submit';
  readonly open: boolean;
}

export interface SubmitButtonProps {
  readonly label: string;
  readonly submittingLabel: string;
}

const SubmitButton = ({ label, submittingLabel }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={buttonClassNameGreen}
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? submittingLabel : label}
    </button>
  );
};

export const ConfirmationModal = ({
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel,
  confirmButtonLabelSubmitting,
  modalBodyWrapper,
  modalCopy,
  modalTitle,
  onCancelHandler,
  onConfirmHandler,
  open,
}: ConfirmationModalProps) => {
  /*
   * Flavio Silva on Aug. 16th, 2023:
   * This is necessary to have the on enter <Transition> animation.
   * When I tried to set "show={true}" and "appear={true}" it didn't work.
   */
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(open), [open]);
  /**/

  const onInternalCancelHandler = () => {
    /*
     * setTimout() used to wait for the leave transition.
     */
    setIsOpen(false);
    setTimeout(onCancelHandler, 300);
    /**/
  };

  const submitButton =
    onConfirmHandler === 'submit' ? (
      <SubmitButton
        label={confirmButtonLabel}
        submittingLabel={
          confirmButtonLabelSubmitting ? confirmButtonLabelSubmitting : confirmButtonLabel
        }
      />
    ) : (
      <button type="button" className={buttonClassNameGreen} onClick={onConfirmHandler}>
        {confirmButtonLabel}
      </button>
    );

  const modalBody = (
    <div className="flex flex-col">
      <p className="mt-6">{modalCopy}</p>
      <div className="mt-12 flex justify-end gap-4">
        <button type="button" className={buttonClassNameWhite} onClick={onInternalCancelHandler}>
          {cancelButtonLabel}
        </button>
        {submitButton}
      </div>
    </div>
  );

  let bodyWrapper;
  if (modalBodyWrapper) {
    bodyWrapper = modalBodyWrapper(modalBody);
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onInternalCancelHandler}>
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
        <div className="fixed inset-0 flex items-center">
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
                <h1 className="text-lg font-semibold text-gray-800">{modalTitle}</h1>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={onInternalCancelHandler}
                >
                  <span className="sr-only">Close modal</span>
                  <XIcon aria-hidden="true" />
                </button>
              </div>
              {bodyWrapper ? bodyWrapper : modalBody}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
