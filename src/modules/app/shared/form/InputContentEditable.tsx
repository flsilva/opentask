'use client';

import 'client-only';
import { forwardRef, useCallback, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { useKeyboardEvent } from '@/modules/shared/utils/useKeyboardEvent';

export interface InputContentEditableProps extends ClassNamePropsOptional {
  readonly defaultValue?: string;
  readonly name?: string;
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readonly onKeyDown?: (event: KeyboardEvent) => void;
  readonly placeholder?: string;
  readonly placeholderClassName?: string;
}

export const InputContentEditable = forwardRef<HTMLInputElement, InputContentEditableProps>(
  (
    {
      className,
      defaultValue,
      name,
      onBlur,
      onFocus,
      onKeyDown,
      placeholder,
      placeholderClassName,
    },
    ref,
  ) => {
    const [content, setContent] = useState(defaultValue ? defaultValue : placeholder || '');
    const [isEditingContent, setIsEditingContent] = useState(false);

    const _onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsEditingContent(true);
      if (onFocus) onFocus(event);
      if (!event.target) return;
      if (event.target.innerHTML !== '' && event.target.innerHTML !== placeholder) return;
      setContent('');
    };

    const _onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsEditingContent(false);
      if (onBlur) onBlur(event);
      if (!event.target || event.target.innerHTML !== '' || !placeholder) return;
      setContent(placeholder);
    };

    const onChange = (event: { target: { value: string } }) => {
      if (!event.target) return;
      setContent(event.target.value);
    };

    /*
     * Flavio Silva on Aug. 14th, 2023:
     * It seems ContentEditable's shouldComponentUpdate() logic ignores event listeners
     * (like onKeydown), preventing it from being used in this case, where the listener
     * depends on reactive values and needs to be updated on rerender.
     *
     * So for now I'll use my custom useKeyboardEvent() hook below.
     */
    const _onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!isEditingContent) return;
        if (onKeyDown) onKeyDown(event);
      },
      [isEditingContent, onKeyDown],
    );

    useKeyboardEvent('keydown', [{ key: '*', listener: _onKeyDown }]);
    /**/

    return (
      <>
        <ContentEditable
          className={content === placeholder ? placeholderClassName : className}
          html={content}
          innerRef={ref as React.RefObject<HTMLElement>}
          onBlur={_onBlur}
          onFocus={_onFocus}
          onChange={onChange}
        />
        {name && <input type="hidden" name={name} value={content === placeholder ? '' : content} />}
      </>
    );
  },
);

InputContentEditable.displayName = 'InputContentEditable';
