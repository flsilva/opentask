'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log('GlobalError()');
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h3>Something went wrong!</h3>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
