import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiBadgedContent, TuiSwitch } from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';

@Component({
  selector: 'app-device',
  imports: [
    TuiBadgedContent,
    TuiSwitch,
    FormsModule,
    TuiIcon,
    TuiTitle,
    TuiCell,
  ],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  protected readonly deviceData = {
    type: 'device',
    icon: 'lightbulb',
    label: 'Floor Lamp',
    state: true,
  };

  protected get icon() {
    return `@tui.material.filled.${this.deviceData.icon}`;
  }
}
