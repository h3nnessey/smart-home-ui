import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardList } from './components/card-list/card-list';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, CardList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
