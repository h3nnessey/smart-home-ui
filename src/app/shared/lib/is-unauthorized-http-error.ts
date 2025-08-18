import { HttpErrors } from '@typings/api/enums';
import type { UnauthorizedHttpError } from '@typings/api/interfaces';

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
