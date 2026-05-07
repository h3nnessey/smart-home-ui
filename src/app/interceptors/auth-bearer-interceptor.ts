import type { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@services/token/token-service';

const attachAuthToken = (
  request: HttpRequest<unknown>,
  token: string | null,
) => {
  if (!token) {
    return request;
  }

  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authBearerInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const withAuthBearerRequest = attachAuthToken(req, tokenService.getToken());

  return next(withAuthBearerRequest);
};
