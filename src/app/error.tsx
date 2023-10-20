'use client';

import { DefaultError } from '@/modules/shared/errors/DefaultError';

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return <DefaultError error={error} reset={reset} />;
}
