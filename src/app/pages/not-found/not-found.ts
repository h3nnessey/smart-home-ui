import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiBlockStatus } from '@taiga-ui/layout';
import { AppRoutes } from '@shared/config/routing';
import { AuthService } from '@services/auth/auth-service';

@Component({
  selector: 'app-not-found',
  imports: [TuiBlockStatus, TuiButton, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  private readonly authService = inject(AuthService);
  protected readonly isAuthed = toSignal(this.authService.isAuthed$);

  protected readonly link = AppRoutes.Login;
  protected readonly message = 'Page not found';
  protected readonly imageSrc = './images/not-found.svg';
}
