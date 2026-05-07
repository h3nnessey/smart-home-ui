import type { Route, Routes } from '@angular/router';
import { authGuard } from '@guards/auth-guard';
import { AppRoutes } from '@shared/config/app-routes';

const loadDashboard = () =>
  import('@pages/dashboard/dashboard').then((m) => m.Dashboard);

const dashboardRedirectionRoute: Route = {
  path: '',
  redirectTo: AppRoutes.Dashboard.Root,
  pathMatch: 'full',
};

export const routes: Routes = [
  {
    path: AppRoutes.Dashboard.Root,
    canActivate: [authGuard],
    children: [
      {
        path: AppRoutes.Dashboard.Entry,
        loadComponent: loadDashboard,
      },
      {
        path: AppRoutes.Dashboard.Tab,
        loadComponent: loadDashboard,
      },
      dashboardRedirectionRoute,
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
  dashboardRedirectionRoute,
  {
    path: '**',
    redirectTo: AppRoutes.NotFound,
  },
];
