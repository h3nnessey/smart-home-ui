import { HttpErrors } from '@typings/api/enums';

export const isUnauthorizedError = (error: unknown) => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    error.status === HttpErrors.Unauthorized
  );
};
