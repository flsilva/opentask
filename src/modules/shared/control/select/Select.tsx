'use client';

import 'client-only';
import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { twMerge } from 'tailwind-merge';
import { ExpandMoreIcon } from '@/modules/shared/icon/ExpandMoreIcon';
import { ExpandLessIcon } from '@/modules/shared/icon/ExpandLessIcon';
import { CheckIcon } from '@/modules/shared/icon/CheckIcon';

export interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  readonly value: string;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectPrimitive.SelectItemProps>(
  ({ children, className, ...props }: SelectPrimitive.SelectItemProps, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={twMerge(
          'relative px-8 py-1 my-1 rounded-md select-none',
          'data-[disabled]:text-gray-400 data-[disabled]:pointer-events-none',
          'data-[highlighted]:outline-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white data-[state=checked]:bg-green-500 data-[state=checked]:text-white',
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="SelectItemIndicator">
          <CheckIcon className="absolute left-1.5 top-2 inline-flex fill-white" />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  },
);

SelectItem.displayName = 'SelectItem';

export interface SelectProps extends SelectPrimitive.SelectProps {
  readonly ariaLabel: string;
  readonly items: Array<SelectItemProps>;
  readonly placeholder: string;
}

const scrollButtonClassName = 'absolute left-0 inline-flex items-center justify-center w-8';

export const Select = ({ ariaLabel, items, placeholder, ...props }: SelectProps) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger
      className="inline-flex items-center justify-center rounded-md px-4 h-9 gap-1 bg-green-600 hover:bg-green-500 text-white shadow-sm"
      aria-label={ariaLabel}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon className="mt-0.5 fill-white">
        <ExpandMoreIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="overflow-hidden bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[41]">
        <SelectPrimitive.ScrollUpButton className={scrollButtonClassName}>
          <ExpandLessIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.children}
            </SelectItem>
          ))}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className={scrollButtonClassName}>
          <ExpandLessIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);
