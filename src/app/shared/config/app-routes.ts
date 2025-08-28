export const AppRouteParams = {
  DashboardId: 'dashboardId',
  TabId: 'tabId',
} as const;

export const AppRoutes = {
  Login: 'login',
  NotFound: 'not-found',
  Dashboard: {
    Root: 'dashboard',
    Entry: `:${AppRouteParams.DashboardId}`,
    Tab: `:${AppRouteParams.DashboardId}/:${AppRouteParams.TabId}`,
  },
} as const;
