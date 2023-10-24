'use client';

import 'client-only';
import { useState } from 'react';
import { experimental_useFormState as useFormState } from 'react-dom';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';

export interface FormActionProps<Response> extends ChildrenProps, ClassNamePropsOptional {
  readonly action: (
    prevState: any,
    formData: FormData,
  ) => Promise<ServerResponse<Response | undefined>>;
  readonly onFormSubmitted?: (response: ServerResponse<Response | undefined>) => void;
}

export const FormAction = <Response,>({
  action,
  children,
  className,
  onFormSubmitted,
}: FormActionProps<Response>) => {
  const [isServerResponseHandled, setIsServerResponseHandled] = useState(false);
  const [serverResponse, formAction] = useFormState(action, null);

  /*
   * Flavio Silva on Oct. 22th:
   * I'm not a big fan of this solution.
   * I don't like to create this extra state (isFormResultHandled).
   * Another alternative would be to wrap the actual action into a function that calls
   * the actual server action, to have control on when it's executed.
   * But a React built-in solution like that would be ideal.
   */
  if (!isServerResponseHandled && serverResponse) {
    setIsServerResponseHandled(true);
    if (onFormSubmitted) onFormSubmitted(serverResponse);
  }
  /**/

  return (
    <form action={formAction} {...(className && { className })}>
      {children}
      {serverResponse?.errors && (
        <div className="flex flex-col">
          <ErrorList errors={serverResponse.errors} />
        </div>
      )}
    </form>
  );
};
