import { Component, input } from '@angular/core';
import { TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-sidebar-header',
  imports: [TuiHeader],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss',
})
export class SidebarHeader {
  public readonly title = input.required<string>();
}
