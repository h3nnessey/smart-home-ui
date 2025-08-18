import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
  type FormControl,
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
import { isUnauthorizedHttpError } from '@shared/lib/is-unauthorized-http-error';

interface LoginForm {
  password: FormControl<string>;
  userName: FormControl<string>;
}

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
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.group<LoginForm>({
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    userName: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  protected isLoading = false;

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

    this.authService
      .login(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate([AppRoutes.DashboardEntry], {
            replaceUrl: true,
          });
        },
        error: (error) => {
          const message = isUnauthorizedHttpError(error)
            ? LoginErrorMessages.InvalidCredentials
            : LoginErrorMessages.UnknownError;

          this.error.set(message);
          this.isLoading = false;
        },
      });
  }
}
