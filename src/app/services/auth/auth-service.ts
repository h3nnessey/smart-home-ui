import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  DEFAULT_USER,
  type UserCredentials,
  type UserProfile,
} from '@typings/user';
import { TokenService } from '../token/token-service';
import { AuthApiService } from './auth-api-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenService = inject(TokenService);
  private readonly apiService = inject(AuthApiService);

  private readonly userSubject = new BehaviorSubject<UserProfile>(DEFAULT_USER);
  private readonly isAuthedSubject = new BehaviorSubject<boolean>(false);
  private readonly isInitializedSubject = new BehaviorSubject<boolean>(false);

  public readonly user$ = this.userSubject.asObservable();
  public readonly isInitialized$ = this.isInitializedSubject.asObservable();
  public readonly isAuthed$ = this.isAuthedSubject
    .asObservable()
    .pipe(map((isAuthed) => isAuthed && !!this.tokenService.getToken()));

  public async initializeAuthState() {
    if (!this.tokenService.getToken()) {
      return void this.resetAuthState();
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
}
