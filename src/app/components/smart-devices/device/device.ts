import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiBadgedContent, TuiSwitch } from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { HighlightDevice } from '@/directives/highlight-device';
import { TuiMaterialIconPipe } from '@/pipes/tui-material-icon-pipe';
import type { DeviceItem, Layout } from '@/types';

@Component({
  selector: 'app-device',
  imports: [
    TuiBadgedContent,
    TuiSwitch,
    FormsModule,
    TuiIcon,
    TuiTitle,
    TuiCell,
    HighlightDevice,
    TuiMaterialIconPipe,
  ],
  templateUrl: './device.html',
  styleUrl: './device.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Device {
  public readonly layout = input.required<Layout>();
  public readonly device = input.required<DeviceItem>();
  public readonly stateChanged = output<boolean>();

  public changeState(value: boolean) {
    this.device().state = value;
    this.stateChanged.emit(value);
  }
}
