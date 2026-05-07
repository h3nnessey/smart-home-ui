import { InjectionToken } from '@angular/core';

export interface TokenServiceConfig {
  key: string;
  storage: Storage;
}

export const TOKEN_SERVICE_CONFIG = new InjectionToken<TokenServiceConfig>(
  'Token Service Config',
  {
    providedIn: 'root',
    factory: () => ({
      key: 'auth-token',
      storage: localStorage,
    }),
  },
);
