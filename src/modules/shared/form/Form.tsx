'use client';

import 'client-only';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ServerError } from '@/modules/shared/data-access/ServerResponse';
import { FormErrorProvider } from './FormErrorProvider';
import { useForm } from './useForm';

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
  const [serverResponse, formAction] = useForm({ action, onFormSubmitted });

  const _children =
    typeof children === 'function' ? children({ response: serverResponse }) : children;

  return (
    <form action={formAction} {...(className && { className })} {...(formRef && { ref: formRef })}>
      <FormErrorProvider errors={serverResponse?.errors}>{_children}</FormErrorProvider>
    </form>
  );
};
