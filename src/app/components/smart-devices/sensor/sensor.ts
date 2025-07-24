import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiBlockDetails } from '@taiga-ui/layout';
import { TuiIcon } from '@taiga-ui/core';
import { SensorValue } from '@/pipes/sensor-value';
import type { Layout, SensorItem } from '@/types';

export type SensorLayout = 'horizontal' | 'vertical';

@Component({
  selector: 'app-sensor',
  imports: [TuiBlockDetails, TuiIcon, SensorValue],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sensor {
  public readonly layout = input.required<Layout>();
  public readonly sensor = input.required<SensorItem>();

  protected get icon() {
    return `@tui.material.filled.${this.sensor().icon}`;
  }
}
