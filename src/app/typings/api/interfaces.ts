import type { HttpErrors } from './enums';

export interface RouteParams {
  dashboardId?: string;
  tabId?: string;
}

export interface UnauthorizedHttpError {
  status: HttpErrors.Unauthorized;
}
