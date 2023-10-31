'use client';

import { useEffect, useState } from 'react';
import { XIcon } from '@/modules/shared/icons/XIcon';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { Modal } from './Modal';

export interface ConfirmationModalProps {
  readonly appear?: boolean;
  readonly cancelButtonLabel?: string;
  readonly confirmButtonLabel: string;
  readonly confirmButtonLabelSubmitting?: string;
  readonly modalCopy: string | React.ReactNode;
  readonly modalTitle: string | React.ReactNode;
  readonly onCancelHandler: () => void;
  readonly onConfirmHandler: (() => void) | 'submit';
  readonly renderBodyWrapper?: (children: React.ReactNode) => React.ReactNode;
  readonly show: boolean;
}

export const ConfirmationModal = ({
  appear,
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel,
  confirmButtonLabelSubmitting,
  modalCopy,
  modalTitle,
  onCancelHandler,
  onConfirmHandler,
  renderBodyWrapper,
  show,
}: ConfirmationModalProps) => {
  /*
   * Flavio Silva on Aug. 16th, 2023:
   * This is necessary to have the on enter <Transition> animation.
   * When I tried to set "show={true}" and "appear={true}" it didn't work.
   */
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(show), [show]);
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
        className={buttonClassNameGreen}
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
  if (renderBodyWrapper) {
    bodyWrapper = renderBodyWrapper(modalBody);
  }

  return (
    <Modal appear={appear} show={isOpen} onClose={onInternalCancelHandler}>
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
    </Modal>
  );
};
