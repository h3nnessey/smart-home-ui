import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import type { UserProfile, UserCredentials } from '@typings/user/interfaces';
import { TokenService } from '../token/token-service';
import { AuthApiService } from './auth-api-service';

const DEFAULT_USER: UserProfile = {
  fullName: '',
  initials: '',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenService = inject(TokenService);
  private readonly apiService = inject(AuthApiService);

  private readonly userSubject = new BehaviorSubject<UserProfile>(DEFAULT_USER);
  private readonly isAuthedSubject = new BehaviorSubject<boolean>(false);
  private readonly isInitializedSubject = new BehaviorSubject<boolean>(false);

  public readonly isAuthed$ = this.isAuthedSubject.asObservable();
  public readonly isInitialized$ = this.isInitializedSubject.asObservable();

  public async initializeAuthState() {
    if (!this.tokenService.getToken()) {
      this.resetAuthState();
      return;
    }

    await this.loadUser();
  }

  private async loadUser() {
    return firstValueFrom(
      this.apiService.getUserProfile().pipe(
        tap((user) => this.handleAuthSuccess(user)),
        catchError(() => this.handleAuthError()),
      ),
    );
  }

  public login(credentials: UserCredentials) {
    return this.apiService.login(credentials).pipe(
      switchMap(({ token }) => {
        this.tokenService.saveToken(token);

        return this.loadUser();
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

  private handleAuthError() {
    this.logout();

    return of(DEFAULT_USER);
  }

  private resetAuthState() {
    this.tokenService.deleteToken();
    this.userSubject.next(DEFAULT_USER);
    this.isAuthedSubject.next(false);
    this.isInitializedSubject.next(true);
  }

  public get user() {
    return this.userSubject.value;
  }

  public get isAuthed() {
    return this.isAuthedSubject.value && !!this.tokenService.getToken();
  }
}
