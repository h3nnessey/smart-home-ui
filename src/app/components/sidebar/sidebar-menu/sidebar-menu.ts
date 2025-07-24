import { Component, input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';

export interface MenuItem {
  label: string;
  icon: string;
  disabled: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [TuiAvatar, TuiButton],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  public readonly items = input.required<MenuItem[]>();
  public readonly hidden = input.required<boolean>();

  public materialIcon(icon: string) {
    return `@tui.material.filled.${icon}`;
  }
}
