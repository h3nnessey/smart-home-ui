import { HttpErrors } from '@typings/api/enums';
import type { UnauthorizedHttpError } from '@typings/api/interfaces';

export const isUnauthorizedHttpError = (
  error: unknown,
): error is UnauthorizedHttpError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    error.status === HttpErrors.Unauthorized
  );
};
