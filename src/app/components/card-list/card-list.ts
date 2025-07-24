import { TabsState } from '@/services/tabs-state';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from './card/card';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardList {
  protected readonly cards = inject(TabsState).getTabs().tabs[0].cards;
}
