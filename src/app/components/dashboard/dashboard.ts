import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TabSwitcher } from './tab-switcher/tab-switcher';
import { TabsState } from '@/services/tabs-state';
import { CardList } from '../card-list/card-list';

@Component({
  selector: 'app-dashboard',
  imports: [TabSwitcher, CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly cards = inject(TabsState).currentTabContent;
}
