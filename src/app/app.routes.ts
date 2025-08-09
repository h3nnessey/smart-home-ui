import type { Routes } from '@angular/router';
import { authGuard } from '@guards/auth-guard';
import { AppRoutes } from '@shared/config/app-routes';

const loadDashboard = () =>
  import('@pages/dashboard/dashboard').then((m) => m.Dashboard);

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.DashboardTab,
        loadComponent: loadDashboard,
      },
      {
        path: AppRoutes.Dashboard,
        loadComponent: loadDashboard,
      },
      {
        path: AppRoutes.DashboardEntry,
        loadComponent: loadDashboard,
      },
      {
        path: '',
        redirectTo: AppRoutes.DashboardEntry,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: AppRoutes.NotFound,
    loadComponent: () =>
      import('@pages/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: AppRoutes.Login,
    loadComponent: () =>
      import('@pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    redirectTo: AppRoutes.NotFound,
  },
];
