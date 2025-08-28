import { inject, Injectable, InjectionToken } from '@angular/core';

export interface TokenServiceConfig {
  key: string;
  storage: Storage;
}

export const TOKEN_SERVICE_CONFIG = new InjectionToken<TokenServiceConfig>(
  'token-service-config',
  {
    providedIn: 'root',
    factory: () => ({
      key: 'auth-token',
      storage: localStorage,
    }),
  },
);

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly config = inject(TOKEN_SERVICE_CONFIG);

  private readonly key = this.config.key;
  private readonly storage = this.config.storage;

  getToken() {
    return this.storage.getItem(this.key);
  }

  saveToken(token: string) {
    this.storage.setItem(this.key, token);
  }

  deleteToken() {
    this.storage.removeItem(this.key);
  }
}
