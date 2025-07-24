import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TabsState } from '@/services/tabs-state';
import { CardList } from '../card-list/card-list';

@Component({
  selector: 'app-dashboard',
  imports: [CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly cards = inject(TabsState).activeTabContent;
}
