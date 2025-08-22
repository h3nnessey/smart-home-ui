import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DashboardService } from '@services/dashboard-service';
import { TabSwitcher } from '@components/tab-switcher/tab-switcher';
import { CardList } from '@components/card-list/card-list';
import { AppRouteParams } from '@typings/api/enums';

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

  protected readonly content = this.dashboardService.content;

  public readonly dashboardId = toSignal(
    this.route.params.pipe(
      map((params) => params[AppRouteParams.DashboardId]),
      distinctUntilChanged(),
    ),
  );

  public readonly tabId = toSignal(
    this.route.params.pipe(
      map((params) => params[AppRouteParams.TabId]),
      distinctUntilChanged(),
    ),
  );

  public readonly currentCards = computed(
    () =>
      this.dashboardService.content().tabs.find((t) => t.id === this.tabId())
        ?.cards || [],
  );

  constructor() {
    effect(() => {
      const tabId = this.tabId();
      const dashboardId = this.dashboardId();

      this.dashboardService.initializeDashboard(dashboardId, tabId);
    });
  }
}
