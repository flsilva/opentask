'use client';

import { useState } from 'react';
import * as DialogRX from '@radix-ui/react-dialog';
import { twJoin, twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { XIcon } from '@/modules/shared/icons/XIcon';
import { RouterAction } from '@/modules/shared/router/RouterActions';
import { useRouterAction } from '@/modules/shared/router/useRouterAction';

/*
 * Scrollable overlay
 * "Move the content inside the overlay to render a dialog with overflow."
 * Ref: https://www.radix-ui.com/primitives/docs/components/dialog#scrollable-overlay
 *
 * We want to have a fade-in / fade-out only in the overlay on mobile, but since we have to
 * move content inside the overlay to have it scrollable, if we animate Dialog.Overlay we also
 * animate Dialog.Content. So we make Dialog.Overlay invisible, and inside it we have
 * a visible one animated, that doesn't wrap Dialog.Content.
 * But we need some animation on Dialog.Overlay in order for Radix to hold its DOM element while
 * the Dialog exit animation plays.
 * So we have this "fake" animation from opacity: 1 to opacity: 1 on Dialog.Overlay.
 */
export const invisibleOverlayFakeAnimation =
  '[state=open]:animate-[fake-fade_200ms_ease-out] data-[state=closed]:animate-[fake-fade_200ms_ease-out]';
export const invisibleOverlayClassNames = `group/overlay fixed inset-0 w-full h-full top-0 left-0 right-0 bottom-0 overflow-y-auto ${invisibleOverlayFakeAnimation}`;
/**/

export const visibleOverlayAnimation =
  'group-data-[state=open]/overlay:animate-[fade-in_200ms_ease-out] group-data-[state=closed]/overlay:animate-[fade-out_200ms_ease-out]';
export const visibleOverlayClassNames = `fixed inset-0 bg-black/50 ${visibleOverlayAnimation}`;

export const dialogContentAnimationSm = `data-[state=open]:animation-dialog-content-show-sm data-[state=closed]:animation-dialog-content-hide-sm`;
export const dialogContentAnimationMd = `md:data-[state=open]:animate-[dialog-content-show-md_300ms_ease-out] md:data-[state=closed]:animate-[dialog-content-hide-md_200ms_ease-in]`;
export const dialogContentClassNames = `flex flex-col mx-auto w-full rounded-lg bg-white p-4 md:w-[40rem] translate-y-[10%] md:translate-y-0 ${dialogContentAnimationSm} ${dialogContentAnimationMd}`;

interface DialogProps extends ChildrenProps {
  readonly defaultOpen?: boolean;
  readonly headerButtons?: React.ReactNode;
  readonly noCloseButton?: boolean;
  readonly onOpenAutoFocus?: (event: Event) => void;
  readonly onOpenChange?: (open: boolean) => void;
  readonly open?: boolean;
  readonly routerActionOnClose?: RouterAction;
  readonly title?: React.ReactNode;
  readonly trigger?: React.ReactNode;
}

export const Dialog = ({
  children,
  defaultOpen,
  headerButtons,
  noCloseButton,
  onOpenAutoFocus,
  onOpenChange,
  open,
  routerActionOnClose,
  title,
  trigger,
}: DialogProps) => {
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

  return (
    <DialogRX.Root
      defaultOpen={defaultOpen}
      {...(open === undefined
        ? { open: isOpen, onOpenChange: _onOpenChange }
        : { open, onOpenChange })}
    >
      {trigger && <DialogRX.Trigger asChild>{trigger}</DialogRX.Trigger>}
      <DialogRX.Portal>
        <DialogRX.Overlay className={twMerge(invisibleOverlayClassNames, 'z-40')}>
          <div className={visibleOverlayClassNames} aria-hidden="true" />
          <div className="flex fixed inset-0 md:items-center">
            <DialogRX.Content className={dialogContentClassNames} onOpenAutoFocus={onOpenAutoFocus}>
              <div
                className={twJoin(
                  'flex justify-between',
                  title ? 'items-center' : 'items-start h-[90%] md:h-full gap-x-3',
                )}
              >
                {title ? <DialogRX.Title className="text-xl">{title}</DialogRX.Title> : children}
                <div className="flex flex-row gap-x-3">
                  {headerButtons}
                  {!noCloseButton && (
                    <DialogRX.Close className="-m-2.5 rounded-md p-1.5 text-gray-700 hover:bg-gray-200">
                      <XIcon aria-hidden="true" />
                    </DialogRX.Close>
                  )}
                </div>
              </div>
              {title && children}
            </DialogRX.Content>
          </div>
        </DialogRX.Overlay>
      </DialogRX.Portal>
    </DialogRX.Root>
  );
};
