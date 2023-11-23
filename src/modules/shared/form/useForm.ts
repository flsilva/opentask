'use client';

import 'client-only';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ServerResponse } from '@/modules/shared/data-access/ServerResponse';

export interface useFormProps<ResponseData> {
  readonly action: (
    prevState: ServerResponse<ResponseData> | undefined,
    formData: FormData,
  ) => Promise<ServerResponse<ResponseData> | undefined>;
  readonly onFormSubmitted?: (response: ServerResponse<ResponseData> | undefined) => void;
}

export const useForm = <ResponseData>({
  action,
  onFormSubmitted,
}: useFormProps<ResponseData>): [
  state: ServerResponse<ResponseData> | undefined,
  dispatch: (payload: FormData) => void,
] => {
  const [serverResponse, setServerResponse] = useState<ServerResponse<ResponseData> | undefined>(
    undefined,
  );

  const [_serverResponse, formAction] = useFormState<
    ServerResponse<ResponseData> | undefined,
    FormData
  >(action, undefined);

  if (serverResponse !== _serverResponse) {
    setServerResponse(_serverResponse);
    if (onFormSubmitted) onFormSubmitted(_serverResponse);
  }

  return [serverResponse, formAction];
};
