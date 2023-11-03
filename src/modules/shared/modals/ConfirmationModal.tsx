'use client';

import { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { RouterActions } from '../controls/button/RouterActions';
import { dialogContentClassNames, visibleOverlayClassNames } from './Modal';
import { useRouterActions } from '../controls/button/useRouterActions';

export interface ConfirmationModalProps {
  readonly defaultOpen?: boolean;
  readonly cancelButtonLabel?: string;
  readonly confirmButtonLabel: string;
  readonly confirmButtonLabelSubmitting?: string;
  readonly modalCopy: string | React.ReactNode;
  readonly modalTitle: string | React.ReactNode;
  readonly onConfirmHandler: (() => void) | 'submit';
  readonly onOpenChange?: (open: boolean) => void;
  readonly open?: boolean;
  readonly renderBodyWrapper?: (children: React.ReactNode) => React.ReactNode;
  readonly routerActionsOnClose?: RouterActions;
}

export const ConfirmationModal = ({
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel,
  confirmButtonLabelSubmitting,
  defaultOpen,
  modalCopy,
  modalTitle,
  onConfirmHandler,
  onOpenChange,
  open,
  renderBodyWrapper,
  routerActionsOnClose,
}: ConfirmationModalProps) => {
  const [isOpen, setIsOpen] = useState(open || defaultOpen);
  const triggerRouterActions = useRouterActions(routerActionsOnClose);

  const _onOpenChange = (_open: boolean) => {
    setIsOpen(_open);

    if (_open) {
      if (onOpenChange) onOpenChange(_open);
    } else {
      setTimeout(() => {
        triggerRouterActions();
        if (onOpenChange) onOpenChange(_open);
      }, 300);
    }
  };

  const submitButton =
    onConfirmHandler === 'submit' ? (
      <AlertDialog.Action asChild>
        <SubmitButton
          className={buttonClassNameGreen}
          label={confirmButtonLabel}
          submittingLabel={
            confirmButtonLabelSubmitting ? confirmButtonLabelSubmitting : confirmButtonLabel
          }
        />
      </AlertDialog.Action>
    ) : (
      <AlertDialog.Action asChild>
        <button type="button" className={buttonClassNameGreen} onClick={onConfirmHandler}>
          {confirmButtonLabel}
        </button>
      </AlertDialog.Action>
    );

  const modalBody = (
    <div className="flex flex-col">
      <AlertDialog.Description className="mt-6">{modalCopy}</AlertDialog.Description>
      <div className="mt-12 flex justify-end gap-4">
        <AlertDialog.Cancel className={buttonClassNameWhite}>
          {cancelButtonLabel}
        </AlertDialog.Cancel>
        {submitButton}
      </div>
    </div>
  );

  let bodyWrapper;
  if (renderBodyWrapper) {
    bodyWrapper = renderBodyWrapper(modalBody);
  }

  return (
    <AlertDialog.Root
      defaultOpen={defaultOpen}
      {...(open === undefined
        ? { open: isOpen, onOpenChange: _onOpenChange }
        : { open, onOpenChange })}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={`${visibleOverlayClassNames} z-50`} />
        <div className="flex fixed inset-0 md:items-center z-50">
          <AlertDialog.Content className={dialogContentClassNames}>
            <AlertDialog.Title className="text-xl">{modalTitle}</AlertDialog.Title>
            {bodyWrapper ? bodyWrapper : modalBody}
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
