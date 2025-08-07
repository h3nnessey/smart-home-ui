import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiBlockStatus } from '@taiga-ui/layout';

@Component({
  selector: 'app-not-found',
  imports: [TuiBlockStatus],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected readonly message = 'Page not found';
  protected readonly imageSrc = './images/not-found.svg';
}
