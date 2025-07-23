import { Component, inject } from '@angular/core';
import { Sensor } from './components/smart-devices/sensor/sensor';

@Component({
  selector: 'app-root',
  imports: [Sensor],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
