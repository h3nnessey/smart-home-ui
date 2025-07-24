import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CardLayout } from '@/types';

@Component({
  selector: 'app-sensor',
  imports: [],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-layout]': 'layout()',
  },
})
export class Sensor {
  readonly layout = input.required<CardLayout>();
}
