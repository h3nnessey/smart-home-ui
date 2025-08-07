import type { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'dashboard/:dashboardId/:tabId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@/components/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@/pages/not-found/not-found').then((m) => m.NotFound),
  },
];
