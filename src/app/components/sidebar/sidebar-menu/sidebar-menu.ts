import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiMaterialIconPipe } from '@pipes/tui-material-icon-pipe';
import { DashboardService } from '@services/dashboard-service';

@Component({
  selector: 'app-sidebar-menu',
  imports: [
    TuiAvatar,
    TuiButton,
    TuiMaterialIconPipe,
    RouterLink,
    RouterLinkActive,
    TuiTitle,
  ],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  public readonly hidden = input.required<boolean>();
  private readonly dashboardService = inject(DashboardService);
  private readonly router = inject(Router);

  protected readonly dashboards = this.dashboardService.dashboards;

  protected readonly emptyMessage =
    "You don't have any dashboards yet. They will appear here as soon as you create them.";

  protected disabled(dashboardId: string) {
    return this.router.url.includes(dashboardId);
  }
}
