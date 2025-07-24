import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { Device } from './components/smart-devices/device/device';

@Component({
  selector: 'app-root',
  imports: [Device, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
