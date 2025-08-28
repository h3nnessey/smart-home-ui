import { Component, DestroyRef, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { filter, tap } from 'rxjs';
import { TuiMaterialIconPipe } from '@pipes/tui-material-icon-pipe';
import { DashboardService } from '@services/dashboard/dashboard-service';
import { AuthService } from '@services/auth/auth-service';
import { AppRoutes } from '@shared/config/app-routes';
import { AppRouter } from '@services/router/app-router';

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
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly router = inject(AppRouter);

  protected readonly appRoutes = AppRoutes;
  protected readonly dashboards = this.dashboardService.dashboards;
  protected readonly emptyMessage =
    "You don't have any dashboards yet. They will appear here as soon as you create them.";

  constructor() {
    this.authService.isAuthed$
      .pipe(
        filter((isAuthed) => isAuthed),
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.dashboardService.loadDashboards()),
      )
      .subscribe();
  }

  protected disabled(dashboardId: string) {
    return this.router.includes(dashboardId);
  }
}
