import type { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TokenService } from '@services/token/token-service';
import { API_PREFIX, BASE_URL } from '@shared/config/api';
import { isUnauthorizedHttpError } from '@shared/lib/is-unauthorized-http-error';
import { AppRouter } from '@services/router/app-router';
import { NotificationService } from '@services/notification/notification-service';
import { LoginErrorMessages } from '@typings/api/enums';
import { AppRoutes } from '@shared/config/app-routes';

const addApiPrefix = (request: HttpRequest<unknown>) => {
  if (request.url.startsWith('http')) {
    return request;
  }

  const hasApiPrefix = request.url.includes(API_PREFIX);
  const cleanUrl = request.url.startsWith('/')
    ? request.url.slice(1)
    : request.url;

  return request.clone({
    url: hasApiPrefix
      ? `${BASE_URL}/${cleanUrl}`
      : `${BASE_URL}/${API_PREFIX}/${cleanUrl}`,
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
  const router = inject(AppRouter);
  const tokenService = inject(TokenService);
  const alerts = inject(NotificationService);

  const withApiPrefixRequest = addApiPrefix(req);
  const withAuthTokenRequest = addAuthToken(
    withApiPrefixRequest,
    tokenService.getToken(),
  );

  return next(withAuthTokenRequest).pipe(
    catchError((error) => {
      const isUnauthorized = isUnauthorizedHttpError(error);
      const isLoginPath = req.url.includes(AppRoutes.Login);
      const message = isUnauthorized
        ? LoginErrorMessages.NoAuthToken
        : LoginErrorMessages.UnknownError;

      if (!isLoginPath) alerts.showError(message).subscribe();

      if (isUnauthorized) {
        tokenService.deleteToken();
        router.navigate.toLogin();
      }

      return throwError(() => error);
    }),
  );
};
