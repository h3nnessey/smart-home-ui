import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TuiAppearance,
  TuiButton,
  TuiLabel,
  TuiTextfield,
  TuiTitle,
  TuiIcon,
} from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';

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
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}
