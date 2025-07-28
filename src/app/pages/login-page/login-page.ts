import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TuiAppearance,
  TuiButton,
  TuiLabel,
  TuiTextfield,
  TuiTitle,
  TuiIcon,
} from '@taiga-ui/core';
import {
  TuiPassword,
  TUI_PASSWORD_OPTIONS,
  type TuiPasswordOptions,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';

const options: TuiPasswordOptions = {
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
  ],
  providers: [
    {
      provide: TUI_PASSWORD_OPTIONS,
      useValue: options,
    },
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}
