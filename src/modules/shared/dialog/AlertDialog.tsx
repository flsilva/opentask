'use client';

import { useState } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { twMerge } from 'tailwind-merge';
import {
  buttonGreenClassName,
  buttonWhiteClassName,
} from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { RouterAction } from '@/modules/shared/router/RouterActions';
import { useRouterAction } from '@/modules/shared/router/useRouterAction';
import {
  dialogContentClassNames,
  invisibleOverlayClassNames,
  visibleOverlayClassNames,
} from './Dialog';

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
  readonly routerActionOnClose?: RouterAction;
  readonly trigger?: React.ReactNode;
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
  routerActionOnClose,
  trigger,
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(open || defaultOpen);
  const routerAction = useRouterAction(routerActionOnClose);

  const _onOpenChange = (_open: boolean) => {
    setIsOpen(_open);

    if (_open) {
      if (onOpenChange) onOpenChange(_open);
    } else {
      setTimeout(() => {
        routerAction();
        if (onOpenChange) onOpenChange(_open);
      }, 300);
    }
  };

  const submitButton =
    onConfirmHandler === 'submit' ? (
      <AlertDialogPrimitive.Action asChild>
        <SubmitButton className={buttonGreenClassName} submitting={confirmButtonLabelSubmitting}>
          {confirmButtonLabel}
        </SubmitButton>
      </AlertDialogPrimitive.Action>
    ) : (
      <AlertDialogPrimitive.Action asChild>
        <button type="button" className={buttonGreenClassName} onClick={onConfirmHandler}>
          {confirmButtonLabel}
        </button>
      </AlertDialogPrimitive.Action>
    );

  const dialogBody = (
    <div className="flex flex-col">
      <AlertDialogPrimitive.Description className="mt-6">
        {dialogCopy}
      </AlertDialogPrimitive.Description>
      <div className="mt-12 flex justify-end gap-4">
        <AlertDialogPrimitive.Cancel className={buttonWhiteClassName}>
          {cancelButtonLabel}
        </AlertDialogPrimitive.Cancel>
        {submitButton}
      </div>
    </div>
  );

  let bodyWrapper;
  if (renderBodyWrapper) {
    bodyWrapper = renderBodyWrapper(dialogBody);
  }

  return (
    <AlertDialogPrimitive.Root
      defaultOpen={defaultOpen}
      {...(open === undefined && !trigger
        ? { open: isOpen, onOpenChange: _onOpenChange }
        : { open, onOpenChange })}
    >
      {trigger && <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className={twMerge(invisibleOverlayClassNames, 'z-50')}>
          <div className={visibleOverlayClassNames} aria-hidden="true" />
          <div className="flex fixed inset-0 md:items-center z-50">
            <AlertDialogPrimitive.Content className={dialogContentClassNames}>
              <AlertDialogPrimitive.Title className="text-xl">
                {dialogTitle}
              </AlertDialogPrimitive.Title>
              {bodyWrapper ? bodyWrapper : dialogBody}
            </AlertDialogPrimitive.Content>
          </div>
        </AlertDialogPrimitive.Overlay>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};
