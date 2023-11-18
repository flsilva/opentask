'use client';

import 'client-only';
import { createContext } from 'react';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ServerError } from '@/modules/shared/data-access/ServerResponse';

export interface FormErrorProviderProps extends ChildrenProps {
  readonly errors?: Array<ServerError>;
}

export const FormErrorContext = createContext<Array<ServerError> | undefined>(undefined);

export const FormErrorProvider = ({ children, errors }: FormErrorProviderProps) => (
  <FormErrorContext.Provider value={errors}>{children}</FormErrorContext.Provider>
);
