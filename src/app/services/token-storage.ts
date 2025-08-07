import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  private readonly key = 'auth-token';

  getToken() {
    return localStorage.getItem(this.key);
  }

  saveToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  deleteToken() {
    localStorage.removeItem(this.key);
  }
}
