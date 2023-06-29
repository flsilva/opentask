'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h3>Something went wrong!</h3>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
