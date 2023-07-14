'use client';

import { useEffect } from 'react';
import Button from '../button/Button';

export default function DefaultError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mt-12 flex  flex-col items-center justify-center">
      <div className="flex max-w-xs flex-col items-center">
        <h3 className="mb-6 text-lg font-semibold">Something went wrong!</h3>
        <p className="mb-8">{error.message}</p>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Please try again
        </Button>
      </div>
    </div>
  );
}
