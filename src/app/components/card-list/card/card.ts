import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  viewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiSwitch } from '@taiga-ui/kit';
import { Device } from '@/components/smart-devices/device/device';
import { Sensor } from '@/components/smart-devices/sensor/sensor';
import type { CardItem } from '@/types';

@Component({
  selector: 'app-card',
  imports: [
    TuiAppearance,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    Device,
    Sensor,
    TuiSwitch,
    FormsModule,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  public readonly card = input.required<CardItem>();
  protected readonly devices = viewChildren(Device);
  protected switchState = false;

  constructor() {
    effect(() => {
      this.setSwitchState();
    });
  }

  public toggleDevices(checked: boolean) {
    for (const device of this.devices()) {
      device.changeState(checked);
    }
  }

  public setSwitchState() {
    this.switchState = this.devices().some(
      (device) => device.device().state === true,
    );
  }
}
