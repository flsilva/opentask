'use client';

import { DefaultError } from '@/modules/shared/errors/DefaultError';

export default function AuthError({ error, reset }: { error: Error; reset: () => void }) {
  return <DefaultError error={error} reset={reset} />;
}
