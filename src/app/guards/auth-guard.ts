import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '@services/auth-service';
import { AppRoutes } from '@shared/config/app-routes';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isInitialized$.pipe(
    filter((initialized) => initialized),
    take(1),
    map(() => authService.isAuthed || router.createUrlTree([AppRoutes.Login])),
  );
};
