'use client';

import DefaultError from '../shared/ui/error/DefaultError';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <DefaultError error={error} reset={reset} />;
}
