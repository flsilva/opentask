'use client';

import 'client-only';
import { createContext, useCallback, useRef, useState } from 'react';
import { ServerResponse } from '@/features/shared/data-access/ServerResponse';
import { useForm } from './useForm';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';
import { useRouterAction } from '@/features/shared/routing/useRouterAction';
import { RouterAction } from '@/features/shared/routing/RouterActions';

export interface KeyValuePair<Value> {
  [key: string]: Value;
}

interface FormChildrenProps<ResponseData> {
  readonly response: ServerResponse<ResponseData> | undefined;
}

export interface FormProps<ResponseData> extends ClassNamePropsOptional {
  readonly action: (
    prevState: ServerResponse<ResponseData> | undefined,
    formData: FormData,
  ) => Promise<ServerResponse<ResponseData> | undefined>;
  readonly children:
    | React.ReactNode
    | ((props: FormChildrenProps<ResponseData>) => React.ReactNode);
  readonly formRef?: React.RefObject<HTMLFormElement>;
  readonly onFormSubmitted?: (response: ServerResponse<ResponseData> | undefined) => void;
  readonly routerActionOnSubmitSuccess?: RouterAction;
}

export interface FormState {
  readonly formRef?: React.RefObject<HTMLFormElement>;
  readonly reset?: () => void;
  readonly response?: ServerResponse<any>;
  readonly subscribeToOnReset?: (key: string, callback: () => void) => void;
  readonly subscribeToOnSubmitted?: (
    key: string,
    callback: (response: ServerResponse<any> | undefined) => void,
  ) => void;
  readonly unsubscribeToOnReset?: (key: string) => void;
  readonly unsubscribeToOnSubmitted?: (key: string) => void;
}

export const FormContext = createContext<FormState>({});

export const Form = <ResponseData,>({
  action,
  children,
  className,
  formRef,
  onFormSubmitted,
  routerActionOnSubmitSuccess,
}: FormProps<ResponseData>) => {
  const _formRef = useRef<HTMLFormElement>(null);
  const routerActionOnSubmitSuccessTrigger = useRouterAction(routerActionOnSubmitSuccess);

  /*
   * onSubmit subscription
   */
  const [onSubmittedListeners, setOnSubmittedListeners] = useState<
    KeyValuePair<(response: ServerResponse<ResponseData> | undefined) => void>
  >({});

  const subscribeToOnSubmitted = useCallback(
    (key: string, callback: (response: ServerResponse<ResponseData> | undefined) => void) => {
      // I think it's fine to mutate it here.
      onSubmittedListeners[key] = callback;
    },
    [onSubmittedListeners],
  );

  const unsubscribeToOnSubmitted = useCallback(
    (key: string) => {
      // I think it's fine to mutate it here.
      delete onSubmittedListeners[key];
    },
    [onSubmittedListeners],
  );

  const callOnSubmittedSubscribers = (response: ServerResponse<ResponseData> | undefined) => {
    for (const key in onSubmittedListeners) {
      if (
        onSubmittedListeners.hasOwnProperty(key) &&
        typeof onSubmittedListeners[key] === 'function'
      ) {
        onSubmittedListeners[key](response);
      }
    }
  };
  /**/

  /*
   * onReset subscription
   */
  const [onResetListeners, setOnResetListeners] = useState<KeyValuePair<() => void>>({});

  const subscribeToOnReset = useCallback(
    (key: string, callback: () => void) => {
      // I think it's fine to mutate it here.
      onResetListeners[key] = callback;
    },
    [onResetListeners],
  );

  const unsubscribeToOnReset = useCallback(
    (key: string) => {
      // I think it's fine to mutate it here.
      delete onResetListeners[key];
    },
    [onResetListeners],
  );

  const reset = () => {
    for (const key in onResetListeners) {
      if (onResetListeners.hasOwnProperty(key) && typeof onResetListeners[key] === 'function') {
        onResetListeners[key]();
      }
    }
  };
  /**/

  const _onFormSubmitted = (response: ServerResponse<ResponseData> | undefined) => {
    if (onFormSubmitted) onFormSubmitted(response);
    callOnSubmittedSubscribers(response);
    routerActionOnSubmitSuccessTrigger();
  };

  const [serverResponse, formAction] = useForm({ action, onFormSubmitted: _onFormSubmitted });

  const _children =
    typeof children === 'function' ? children({ response: serverResponse }) : children;

  return (
    <FormContext.Provider
      value={{
        formRef: formRef ?? _formRef,
        reset,
        response: serverResponse,
        subscribeToOnReset,
        subscribeToOnSubmitted,
        unsubscribeToOnReset,
        unsubscribeToOnSubmitted,
      }}
    >
      <form action={formAction} {...(className && { className })} ref={formRef ?? _formRef}>
        {_children}
      </form>
    </FormContext.Provider>
  );
};
