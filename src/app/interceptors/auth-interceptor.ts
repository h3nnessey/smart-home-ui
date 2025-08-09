import type { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenStorage } from '@services/token-storage';
import { BASE_URL } from '@shared/config/api';
import { AppRoutes } from '@shared/config/app-routes';
import { HttpErrors } from '@typings/api/enums';

const addApiPrefix = (request: HttpRequest<unknown>) => {
  if (request.url.startsWith('http')) {
    return request;
  }

  const hasApiPrefix = request.url.includes('api');
  const cleanUrl = request.url.startsWith('/')
    ? request.url.slice(1)
    : request.url;

  return request.clone({
    url: hasApiPrefix
      ? `${BASE_URL}/${cleanUrl}`
      : `${BASE_URL}/api/${cleanUrl}`,
  });
};

const addAuthToken = (request: HttpRequest<unknown>, token: string | null) => {
  if (!token) {
    return request;
  }

  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorage);
  const router = inject(Router);

  const withApiPrefixRequest = addApiPrefix(req);
  const withAuthTokenRequest = addAuthToken(
    withApiPrefixRequest,
    tokenStorage.getToken(),
  );

  return next(withAuthTokenRequest).pipe(
    catchError((error) => {
      if (error.status === HttpErrors.Unauthorized) {
        tokenStorage.deleteToken();
        router.navigate([AppRoutes.Login]);
      }

      return throwError(() => error);
    }),
  );
};
