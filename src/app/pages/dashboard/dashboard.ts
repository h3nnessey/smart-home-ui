import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs/operators';
import { DashboardService } from '@services/dashboard-service';
import type { RouteParams } from '@typings/api/interfaces';
import { TabSwitcher } from '@components/tab-switcher/tab-switcher';
import { CardList } from '@components/card-list/card-list';
import { AppRouteParams } from '@typings/api/enums';
import { AppRoutes } from '@shared/config/app-routes';

@Component({
  selector: 'app-dashboard',
  imports: [CardList, TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly route = inject(ActivatedRoute);
  private readonly dashboardService = inject(DashboardService);

  private readonly routeParams = toSignal(
    this.route.params.pipe(
      distinctUntilChanged(
        (prev, curr) =>
          prev[AppRouteParams.DashboardId] ===
            curr[AppRouteParams.DashboardId] &&
          prev[AppRouteParams.TabId] === curr[AppRouteParams.TabId],
      ),
    ),
    { initialValue: {} as RouteParams },
  );
  public readonly dashboardId = () =>
    this.routeParams()[AppRouteParams.DashboardId];
  public readonly tabId = () => this.routeParams()[AppRouteParams.TabId];

  public readonly currentCards = computed(
    () =>
      this.dashboardService.content().tabs.find((t) => t.id === this.tabId())
        ?.cards || [],
  );

  public readonly tabs = computed(() =>
    this.dashboardService.content().tabs.map(({ id, title }) => ({
      id,
      title,
      path: [`/${AppRoutes.DashboardEntry}`, this.dashboardId(), id],
    })),
  );

  constructor() {
    effect(() => {
      const tabId = this.tabId();
      const dashboardId = this.dashboardId();

      this.dashboardService.initializeDashboard(dashboardId, tabId);
    });
  }
}
