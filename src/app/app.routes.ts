import type { Routes } from '@angular/router';
import { authGuard } from '@guards/auth-guard';

const loadDashboard = () =>
  import('@pages/dashboard/dashboard').then((m) => m.Dashboard);

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard/:dashboardId/:tabId',
        loadComponent: loadDashboard,
      },
      {
        path: 'dashboard/:dashboardId',
        loadComponent: loadDashboard,
      },
      {
        path: 'dashboard',
        loadComponent: loadDashboard,
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('@pages/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
