'use client';

import 'client-only';
import { useContext } from 'react';
import { ServerError } from '@/modules/shared/data-access/ServerResponse';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { FormErrorContext } from './FormErrorProvider';

export const FormErrorList = () => {
  const errors: Array<ServerError> | undefined = useContext(FormErrorContext);
  if (!errors) return null;

  return <ErrorList errors={errors} />;
};
