'use client';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error }: ErrorProps) => {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};

export default Error;
