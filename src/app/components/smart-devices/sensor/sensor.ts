import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { SensorValue } from '@/pipes/sensor-value';
import type { CardLayout, SensorItem } from '@/types';

@Component({
  selector: 'app-sensor',
  imports: [SensorValue, TitleCasePipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-layout]': 'layout()',
  },
})
export class Sensor {
  readonly layout = input.required<CardLayout>();
  protected readonly item: SensorItem = {
    type: 'sensor',
    icon: 'thermostat',
    label: 'Temperature',
    value: {
      amount: 18.5,
      unit: '\u00b0C',
    },
  };
}
