'use client';

import 'client-only';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ServerError } from '../data-access/ServerResponse';
import { FormErrorProvider } from './FormErrorProvider';

export interface FormChildrenProps<ServerResponse> {
  readonly response: ServerResponse | undefined;
}

export interface FormProps<ServerResponse> extends ClassNamePropsOptional {
  readonly action: (
    prevState: ServerResponse | undefined,
    formData: FormData,
  ) => Promise<ServerResponse | undefined>;
  readonly formRef?: React.Ref<HTMLFormElement>;
  readonly children:
    | React.ReactNode
    | ((props: FormChildrenProps<ServerResponse>) => React.ReactNode);
  readonly onFormSubmitted?: (response: ServerResponse | undefined) => void;
}

export const Form = <ServerResponse extends { readonly errors?: Array<ServerError> }>({
  action,
  children,
  className,
  formRef,
  onFormSubmitted,
}: FormProps<ServerResponse>) => {
  const [serverResponse, setServerResponse] = useState<ServerResponse | undefined>(undefined);
  const [_serverResponse, formAction] = useFormState<ServerResponse | undefined, FormData>(
    action,
    undefined,
  );

  if (serverResponse !== _serverResponse) {
    setServerResponse(_serverResponse);
    if (onFormSubmitted) {
      onFormSubmitted(_serverResponse);
    }
  }

  const _children =
    typeof children === 'function' ? children({ response: _serverResponse }) : children;

  return (
    <form action={formAction} {...(className && { className })} {...(formRef && { ref: formRef })}>
      <FormErrorProvider errors={_serverResponse?.errors}>{_children}</FormErrorProvider>
    </form>
  );
};
