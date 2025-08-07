import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from './token-storage';
import type { User } from '@/types';
import { Router } from '@angular/router';

const DEFAULT_USER: User = {
  fullName: '',
  initials: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorage);
  private readonly router = inject(Router);
  public readonly user = signal<User>(DEFAULT_USER);
  public readonly isAuthed = signal(false);

  public login() {
    const token = this.tokenStorage.getToken();

    if (token) {
      this.http.get<User>('user/profile').subscribe({
        next: (value) => {
          this.isAuthed.set(true);
          this.user.set(value);
        },
        error: () => {
          this.isAuthed.set(false);
          this.user.set(DEFAULT_USER);
        },
      });
    }
  }

  public logout() {
    this.tokenStorage.deleteToken();
    this.user.set(DEFAULT_USER);
    this.isAuthed.set(false);
    this.router.navigate(['/login']);
  }
}
