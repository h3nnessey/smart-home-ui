import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { a } from '@/temp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = a.toString();
}
