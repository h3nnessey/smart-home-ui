import { inject } from '@angular/core';
import { type CanActivateFn } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth-service';
import { AppRouter } from '@services/router/app-router';

export const authGuard: CanActivateFn = () => {
  const router = inject(AppRouter);
  const authService = inject(AuthService);

  return authService.isInitialized$.pipe(
    filter((initialized) => initialized),
    take(1),
    map(() => authService.isAuthed || router.urlTree.login()),
  );
};
