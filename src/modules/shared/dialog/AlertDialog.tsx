'use client';

import { useState } from 'react';
import * as AlertDialogRX from '@radix-ui/react-alert-dialog';
import { twMerge } from 'tailwind-merge';
import {
  buttonGreenClassName,
  buttonWhiteClassName,
} from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { useRouterActions } from '@/modules/shared/router/useRouterActions';
import { dialogContentClassNames, visibleOverlayClassNames } from './Dialog';

export interface AlertDialogProps {
  readonly defaultOpen?: boolean;
  readonly cancelButtonLabel?: string;
  readonly confirmButtonLabel: string;
  readonly confirmButtonLabelSubmitting?: React.ReactNode;
  readonly dialogCopy: string | React.ReactNode;
  readonly dialogTitle: string | React.ReactNode;
  readonly onConfirmHandler: (() => void) | 'submit';
  readonly onOpenChange?: (open: boolean) => void;
  readonly open?: boolean;
  readonly renderBodyWrapper?: (children: React.ReactNode) => React.ReactNode;
  readonly routerActionsOnClose?: RouterActions;
}

export const AlertDialog = ({
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel,
  confirmButtonLabelSubmitting,
  defaultOpen,
  dialogCopy,
  dialogTitle,
  onConfirmHandler,
  onOpenChange,
  open,
  renderBodyWrapper,
  routerActionsOnClose,
}: AlertDialogProps) => {
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
      <AlertDialogRX.Action asChild>
        <SubmitButton className={buttonGreenClassName} submitting={confirmButtonLabelSubmitting}>
          {confirmButtonLabel}
        </SubmitButton>
      </AlertDialogRX.Action>
    ) : (
      <AlertDialogRX.Action asChild>
        <button type="button" className={buttonGreenClassName} onClick={onConfirmHandler}>
          {confirmButtonLabel}
        </button>
      </AlertDialogRX.Action>
    );

  const dialogBody = (
    <div className="flex flex-col">
      <AlertDialogRX.Description className="mt-6">{dialogCopy}</AlertDialogRX.Description>
      <div className="mt-12 flex justify-end gap-4">
        <AlertDialogRX.Cancel className={buttonWhiteClassName}>
          {cancelButtonLabel}
        </AlertDialogRX.Cancel>
        {submitButton}
      </div>
    </div>
  );

  let bodyWrapper;
  if (renderBodyWrapper) {
    bodyWrapper = renderBodyWrapper(dialogBody);
  }

  return (
    <AlertDialogRX.Root
      defaultOpen={defaultOpen}
      {...(open === undefined
        ? { open: isOpen, onOpenChange: _onOpenChange }
        : { open, onOpenChange })}
    >
      <AlertDialogRX.Portal>
        <AlertDialogRX.Overlay className={twMerge(visibleOverlayClassNames, 'z-50')} />
        <div className="flex fixed inset-0 md:items-center z-50">
          <AlertDialogRX.Content className={dialogContentClassNames}>
            <AlertDialogRX.Title className="text-xl">{dialogTitle}</AlertDialogRX.Title>
            {bodyWrapper ? bodyWrapper : dialogBody}
          </AlertDialogRX.Content>
        </div>
      </AlertDialogRX.Portal>
    </AlertDialogRX.Root>
  );
};
