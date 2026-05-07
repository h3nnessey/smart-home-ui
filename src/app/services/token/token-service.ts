import { inject, Injectable } from '@angular/core';
import { TOKEN_SERVICE_CONFIG } from './token-service.config';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly config = inject(TOKEN_SERVICE_CONFIG);

  private readonly key = this.config.key;
  private readonly storage = this.config.storage;

  public getToken() {
    return this.storage.getItem(this.key);
  }

  public saveToken(token: string) {
    this.storage.setItem(this.key, token);
  }

  public deleteToken() {
    this.storage.removeItem(this.key);
  }
}
