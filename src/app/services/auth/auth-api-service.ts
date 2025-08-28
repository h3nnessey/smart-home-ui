import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiRoutes } from '@shared/config/api';
import { isUnauthorizedHttpError } from '@shared/lib/is-unauthorized-http-error';
import { LoginErrorMessages } from '@typings/api/enums';
import type { AuthLoginError } from '@typings/api/interfaces';
import type {
  AuthToken,
  UserCredentials,
  UserProfile,
} from '@typings/user/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);

  public login(credentials: UserCredentials) {
    return this.http.post<AuthToken>(ApiRoutes.UserLogin, credentials).pipe(
      catchError((error) => {
        const message = isUnauthorizedHttpError(error)
          ? LoginErrorMessages.InvalidCredentials
          : LoginErrorMessages.UnknownError;

        return throwError(() => ({ message }) satisfies AuthLoginError);
      }),
    );
  }

  public getUserProfile() {
    return this.http.get<UserProfile>(ApiRoutes.UserProfile);
  }
}
