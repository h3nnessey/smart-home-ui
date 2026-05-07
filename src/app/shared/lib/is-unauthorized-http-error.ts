import { type UnauthorizedHttpError, HttpErrors } from '@typings/api';

export const isUnauthorizedHttpError = (
  error: unknown,
): error is UnauthorizedHttpError => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  return (
    'status' in error &&
    typeof error.status === 'number' &&
    error.status === HttpErrors.Unauthorized
  );
};
