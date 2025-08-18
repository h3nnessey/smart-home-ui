import { DestroyRef, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, switchMap, tap } from 'rxjs/operators';
import type {
  UserProfile,
  UserCredentials,
  AuthToken,
} from '@typings/user/interfaces';
import { ApiRoutes } from '@shared/config/api';
import { TokenStorage } from './token-storage';
import { isUnauthorizedHttpError } from '@shared/lib/is-unauthorized-http-error';

const DEFAULT_USER: UserProfile = {
  fullName: '',
  initials: '',
};

@Injectable({ providedIn: 'root' })
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

  private initializeAuthState(): void {
    if (!this.storage.getToken()) {
      this.resetAuthState();
      return;
    }

    this.getUserProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: (err) => console.error(err),
      });
  }

  public getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(ApiRoutes.UserProfile).pipe(
      tap((user) => this.handleAuthSuccess(user)),
      catchError((error) => this.handleAuthError(error)),
    );
  }

  public login(credentials: UserCredentials): Observable<UserProfile> {
    return this.http.post<AuthToken>(ApiRoutes.UserLogin, credentials).pipe(
      switchMap(({ token }) => {
        this.storage.saveToken(token);

        return this.getUserProfile();
      }),
    );
  }

  public logout(): void {
    this.resetAuthState();
  }

  private handleAuthSuccess(user: UserProfile): void {
    this.userSubject.next(user);
    this.isAuthedSubject.next(true);
    this.isInitializedSubject.next(true);
  }

  private handleAuthError(error: unknown): Observable<UserProfile> {
    if (isUnauthorizedHttpError(error)) {
      this.logout();
    }

    return of(DEFAULT_USER);
  }

  private resetAuthState(): void {
    this.storage.deleteToken();
    this.userSubject.next(DEFAULT_USER);
    this.isAuthedSubject.next(false);
    this.isInitializedSubject.next(true);
  }

  public get user(): UserProfile {
    return this.userSubject.value;
  }

  public get isAuthed(): boolean {
    return this.isAuthedSubject.value && !!this.storage.getToken();
  }
}
