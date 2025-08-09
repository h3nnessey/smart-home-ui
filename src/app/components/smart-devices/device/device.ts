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
import { TuiMaterialIconPipe } from '@pipes/tui-material-icon-pipe';
import { HighlightElement } from '@directives/highlight-element';
import { Layout } from '@typings/dashboard/enums';
import type { DeviceItem } from '@typings/dashboard/interfaces';

@Component({
  selector: 'app-device',
  imports: [
    FormsModule,
    TuiBadgedContent,
    TuiSwitch,
    TuiIcon,
    TuiTitle,
    TuiCell,
    TuiMaterialIconPipe,
    HighlightElement,
  ],
  templateUrl: './device.html',
  styleUrl: './device.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Device {
  public readonly layout = input.required<Layout>();
  public readonly device = input.required<DeviceItem>();
  public readonly stateChanged = output<boolean>();

  protected readonly layoutTypes = Layout;

  public changeState(value: boolean) {
    this.device().state = value;
    this.stateChanged.emit(value);
  }
}
