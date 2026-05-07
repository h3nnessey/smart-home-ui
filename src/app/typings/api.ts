export enum LoginErrorMessages {
  InvalidCredentials = 'Invalid login or password.',
  UnknownError = 'Unknown error occurred. Please try again later.',
  NoAuthToken = 'No auth token found.',
}

export enum AppRouteParams {
  DashboardId = 'dashboardId',
  TabId = 'tabId',
}

export enum HttpErrors {
  Unauthorized = 401,
}

export interface RouteParams {
  dashboardId?: string;
  tabId?: string;
}

export interface UnauthorizedHttpError {
  status: HttpErrors.Unauthorized;
}

export interface AuthLoginError {
  message: LoginErrorMessages;
}
