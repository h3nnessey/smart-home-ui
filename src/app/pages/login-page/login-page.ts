import { AsyncPipe } from '@angular/common';
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
import { catchError, tap } from 'rxjs';
import { AuthService } from '@services/auth/auth-service';
import { NotificationService } from '@services/notification/notification-service';
import { AppRouter } from '@services/router/app-router';
import type { AuthLoginError } from '@typings/api/interfaces';

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
  private readonly router = inject(AppRouter);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly alerts = inject(NotificationService);

  protected readonly form = this.fb.group<LoginForm>({
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    userName: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  protected isLoading = signal(false);

  constructor() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected handleSubmit() {
    this.isLoading.set(true);

    this.authService
      .login(this.form.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigate.toDashboard()),
        catchError(({ message }: AuthLoginError) => {
          this.isLoading.set(false);

          return this.alerts
            .showError(message)
            .pipe(takeUntilDestroyed(this.destroyRef));
        }),
      )
      .subscribe();
  }
}
