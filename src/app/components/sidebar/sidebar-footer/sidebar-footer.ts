import { Component, input, output } from '@angular/core';
import { TuiAutoColorPipe, TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiMaterialIconPipe } from '@pipes/tui-material-icon-pipe';

@Component({
  selector: 'app-sidebar-footer',
  imports: [
    TuiAvatar,
    TuiAutoColorPipe,
    TuiButton,
    TuiMaterialIconPipe,
    TuiIcon,
  ],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  public readonly initials = input.required<string>();
  public readonly username = input.required<string>();
  public readonly hidden = input.required<boolean>();
  public readonly logoutClick = output();
  protected readonly icon = 'logout';

  public onLogout() {
    this.logoutClick.emit();
  }
}
