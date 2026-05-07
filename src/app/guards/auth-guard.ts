import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AppRoutes } from '@shared/config/routing';
import { AuthService } from '@services/auth/auth-service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isInitialized$.pipe(
    filter((isInitialized) => isInitialized),
    take(1),
    switchMap(() =>
      authService.isAuthed$.pipe(
        take(1),
        map((isAuthed) => isAuthed || router.createUrlTree([AppRoutes.Login])),
      ),
    ),
  );
};
