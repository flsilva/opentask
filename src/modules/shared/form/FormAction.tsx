'use client';

import 'client-only';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';

export interface FormActionChildrenProps<ServerResponse> {
  readonly response: ServerResponse | undefined;
}

export interface FormActionProps<ServerResponse> extends ClassNamePropsOptional {
  readonly action: (
    prevState: ServerResponse | undefined,
    formData: FormData,
  ) => Promise<ServerResponse | undefined>;
  readonly formRef?: React.Ref<HTMLFormElement>;
  readonly children: (props: FormActionChildrenProps<ServerResponse>) => React.ReactNode;
  readonly onFormSubmitted?: (response: ServerResponse | undefined) => void;
}

export const FormAction = <ServerResponse,>({
  action,
  children,
  className,
  formRef,
  onFormSubmitted,
}: FormActionProps<ServerResponse>) => {
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

  return (
    <form action={formAction} {...(className && { className })} {...(formRef && { ref: formRef })}>
      {children({ response: _serverResponse })}
    </form>
  );
};
