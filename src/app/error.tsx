'use client';

import { DefaultError } from '@/features/shared/ui/error/DefaultError';

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return <DefaultError error={error} reset={reset} />;
}
