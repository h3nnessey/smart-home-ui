import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap, take } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import type {
  UserProfile,
  UserCredentials,
  AuthToken,
} from '@typings/user/interfaces';
import { ApiRoutes } from '@shared/config/api';
import { AppRoutes } from '@shared/config/app-routes';
import { TokenStorage } from './token-storage';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const DEFAULT_USER: UserProfile = {
  fullName: '',
  initials: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly storage = inject(TokenStorage);

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

    this.getUserProfile().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  public getUserProfile() {
    return this.http.get<UserProfile>(ApiRoutes.UserProfile).pipe(
      tap((user) => this.handleAuthSuccess(user)),
      catchError((error) => this.handleAuthError(error)),
    );
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
