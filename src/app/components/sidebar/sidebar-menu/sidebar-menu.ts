import { Component, input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiMaterialIconPipe } from '@/pipes/tui-material-icon-pipe';

export interface MenuItem {
  label: string;
  icon: string;
  disabled: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [TuiAvatar, TuiButton, TuiMaterialIconPipe],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  public readonly items = input.required<MenuItem[]>();
  public readonly hidden = input.required<boolean>();
}
