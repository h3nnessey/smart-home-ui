import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiBlockDetails } from '@taiga-ui/layout';
import { TuiIcon } from '@taiga-ui/core';
import { SensorValue } from '@pipes/sensor-value';
import { TuiMaterialIconPipe } from '@pipes/tui-material-icon-pipe';
import type { Layout } from '@typings/dashboard/enums';
import type { SensorItem } from '@typings/dashboard/interfaces';

@Component({
  selector: 'app-sensor',
  imports: [TuiBlockDetails, TuiIcon, SensorValue, TuiMaterialIconPipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sensor {
  public readonly layout = input.required<Layout>();
  public readonly sensor = input.required<SensorItem>();
}
