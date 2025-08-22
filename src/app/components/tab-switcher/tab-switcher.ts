import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiTabs } from '@taiga-ui/kit';
import { AppRoutes } from '@shared/config/app-routes';
import type { TabItem } from '@typings/dashboard/interfaces';

@Component({
  selector: 'app-tab-switcher',
  imports: [TuiTabs, RouterLink, RouterLinkActive],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  public readonly tabs = input.required<TabItem[]>();
  public readonly dashboardId = input.required<string>();

  protected readonly items = computed(() =>
    this.tabs().map(({ id, title }) => ({
      id,
      title,
      path: [`/${AppRoutes.DashboardEntry}`, this.dashboardId(), id],
    })),
  );
}
