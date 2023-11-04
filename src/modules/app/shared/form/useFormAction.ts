'use client';

import 'client-only';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export interface useFormActionProps<ServerResponse> {
  readonly action: (
    prevState: ServerResponse | undefined,
    formData: FormData,
  ) => Promise<ServerResponse | undefined>;
  readonly onFormSubmitted?: (response: ServerResponse | undefined) => void;
}

export const useFormAction = <ServerResponse>({
  action,
  onFormSubmitted,
}: useFormActionProps<ServerResponse>): [
  state: ServerResponse | undefined,
  dispatch: (payload: FormData) => void,
] => {
  const [_serverResponse, _setServerResponse] = useState<ServerResponse | undefined>(undefined);
  const [serverResponse, formAction] = useFormState<ServerResponse | undefined, FormData>(
    action,
    undefined,
  );

  if (serverResponse !== _serverResponse) {
    _setServerResponse(serverResponse);
    if (onFormSubmitted) {
      onFormSubmitted(serverResponse);
    }
  }

  return [serverResponse, formAction];
};
