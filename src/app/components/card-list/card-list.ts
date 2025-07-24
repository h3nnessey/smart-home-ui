import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from './card/card';
import type { CardItem } from '@/types';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardList {
  public readonly cards = input.required<CardItem[]>();
}
