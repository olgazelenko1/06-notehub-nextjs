'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
