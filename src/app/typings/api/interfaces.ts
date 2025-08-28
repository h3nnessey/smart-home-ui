import type { HttpErrors, LoginErrorMessages } from './enums';

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
