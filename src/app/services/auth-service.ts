import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import type {
  UserProfile,
  UserCredentials,
  AuthToken,
} from '@typings/user/interfaces';
import { ApiRoutes } from '@shared/config/api';
import { TokenStorage } from './token-storage';

const DEFAULT_USER: UserProfile = {
  fullName: '',
  initials: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(TokenStorage);
  private readonly destroyRef = inject(DestroyRef);

  private readonly userSubject = new BehaviorSubject<UserProfile>(DEFAULT_USER);
  private readonly isAuthedSubject = new BehaviorSubject<boolean>(false);
  private readonly isInitializedSubject = new BehaviorSubject<boolean>(false);

  public readonly user$ = this.userSubject.asObservable();
  public readonly isAuthed$ = this.isAuthedSubject.asObservable();
  public readonly isInitialized$ = this.isInitializedSubject.asObservable();

  constructor() {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    if (!this.storage.getToken()) {
      this.resetAuthState();
      return;
    }

    this.getUserProfile().subscribe({
      next: (user) => this.handleAuthSuccess(user),
      error: (err) => this.handleAuthError(err),
    });
  }

  public getUserProfile() {
    return this.http
      .get<UserProfile>(ApiRoutes.UserProfile)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef));
  }

  public login(credentials: UserCredentials) {
    return this.http.post<AuthToken>(ApiRoutes.UserLogin, credentials).pipe(
      switchMap(({ token }) => {
        this.storage.saveToken(token);

        return this.getUserProfile();
      }),
    );
  }

  public logout() {
    this.resetAuthState();
  }

  private handleAuthSuccess(user: UserProfile) {
    this.userSubject.next(user);
    this.isAuthedSubject.next(true);
    this.isInitializedSubject.next(true);
  }

  private handleAuthError(error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      error.status === 401
    ) {
      this.logout();
    }

    return of(DEFAULT_USER);
  }

  private resetAuthState() {
    this.storage.deleteToken();
    this.userSubject.next(DEFAULT_USER);
    this.isAuthedSubject.next(false);
    this.isInitializedSubject.next(true);
  }

  public get user() {
    return this.userSubject.value;
  }

  public get isAuthed() {
    return this.isAuthedSubject.value;
  }
}
