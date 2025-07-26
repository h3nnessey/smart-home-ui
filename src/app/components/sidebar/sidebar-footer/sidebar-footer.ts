import { Component, input } from '@angular/core';
import { TuiAutoColorPipe } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
  selector: 'app-sidebar-footer',
  imports: [TuiAvatar, TuiAutoColorPipe],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  public readonly initials = input.required<string>();
  public readonly username = input.required<string>();
  public readonly hidden = input.required<boolean>();
}
