import { inject } from '@angular/core';
import { Router } from '@angular/router';
import type { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '@services/notification/notification-service';
import { AuthService } from '@services/auth/auth-service';
import { isUnauthorizedHttpError } from '@shared/lib/is-unauthorized-http-error';
import { AppRoutes } from '@shared/config/routing';
import { LoginErrorMessages } from '@typings/api';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const alerts = inject(NotificationService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      const isUnauthorized = isUnauthorizedHttpError(error);
      const isLoginPath = req.url.includes(AppRoutes.Login);
      const message = isUnauthorized
        ? LoginErrorMessages.NoAuthToken
        : LoginErrorMessages.UnknownError;

      if (!isLoginPath) alerts.showError(message).subscribe();

      if (isUnauthorized) {
        authService.logout();
        router.navigate([AppRoutes.Login], { replaceUrl: true });
      }

      return throwError(() => error);
    }),
  );
};
