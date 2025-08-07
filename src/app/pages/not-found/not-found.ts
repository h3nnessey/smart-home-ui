import { AuthService } from '@/services/auth-service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiBlockStatus } from '@taiga-ui/layout';

@Component({
  selector: 'app-not-found',
  imports: [TuiBlockStatus, TuiButton, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected readonly message = 'Page not found';
  protected readonly imageSrc = './images/not-found.svg';
  protected readonly isAuthed = inject(AuthService).isAuthed;
}
