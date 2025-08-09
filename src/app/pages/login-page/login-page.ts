import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiAppearance,
  TuiButton,
  TuiLabel,
  TuiTextfield,
  TuiTitle,
  TuiIcon,
  TuiError,
} from '@taiga-ui/core';
import {
  TuiPassword,
  TUI_PASSWORD_OPTIONS,
  type TuiPasswordOptions,
  TuiFieldErrorPipe,
  TuiButtonLoading,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { AuthService } from '@services/auth-service';
import type { UserCredentials } from '@typings/user/interfaces';
import { LoginErrorMessages } from '@typings/api/enums';
import { AppRoutes } from '@shared/config/app-routes';

const OPTIONS: TuiPasswordOptions = {
  icons: {
    hide: '@tui.material.outlined.visibility_off',
    show: '@tui.material.outlined.visibility',
  },
};

@Component({
  selector: 'app-login-page',
  imports: [
    TuiCardLarge,
    TuiAppearance,
    TuiForm,
    TuiLabel,
    TuiTextfield,
    TuiHeader,
    TuiTitle,
    TuiButton,
    TuiIcon,
    TuiPassword,
    TuiError,
    ReactiveFormsModule,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiButtonLoading,
  ],
  providers: [
    {
      provide: TUI_PASSWORD_OPTIONS,
      useValue: OPTIONS,
    },
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly error = signal<string | null>(null);
  protected isLoading = false;

  protected readonly form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor() {
    this.form.valueChanges.subscribe(() => {
      if (this.error()) {
        this.error.set(null);
      }
    });
  }

  protected handleSubmit() {
    this.error.set(null);
    this.isLoading = true;

    this.authService.login(this.form.value as UserCredentials).subscribe({
      next: () => {
        this.router.navigate([AppRoutes.DashboardEntry], { replaceUrl: true });
      },
      error: (error) => {
        const message =
          error.status === 401
            ? LoginErrorMessages.InvalidCredentials
            : LoginErrorMessages.UnknownError;

        this.error.set(message);
        this.isLoading = false;
      },
    });
  }
}
