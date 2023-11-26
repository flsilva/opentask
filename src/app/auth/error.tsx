'use client';

import { DefaultError } from '@/modules/shared/error/DefaultError';

export default function AuthError({ error, reset }: { error: Error; reset: () => void }) {
  return <DefaultError error={error} reset={reset} />;
}
