'use client';

import 'client-only';
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ServerError } from '@/modules/app/shared/errors/ServerResponse';

interface ErrorListProps extends ClassNamePropsOptional {
  readonly errors: Array<ServerError>;
}

export const ErrorList = ({ className, errors }: ErrorListProps) => {
  const { pending } = useFormStatus();
  if (pending || !errors || errors.length < 1) return null;

  return (
    <div className={twMerge('flex flex-col', className)}>
      {errors.map((error) => (
        <p key={error.message} className="text-sm mb-2 text-red-600">
          {error.message}
        </p>
      ))}
    </div>
  );
};
