import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type {
  DashboardItem,
  DashboardContent,
} from '@typings/dashboard/interfaces';
import { AppRoutes } from '@shared/config/app-routes';
import { DashboardApiService } from './dashboard-api-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiService = inject(DashboardApiService);

  private readonly _dashboards = signal<DashboardItem[]>([]);
  private readonly _content = signal<DashboardContent>({ tabs: [] });
  private readonly _currentDashboardId = signal<string | null>(null);

  public readonly content = this._content.asReadonly();
  public readonly dashboards = this._dashboards.asReadonly();

  public async loadDashboards() {
    const dashboards = await firstValueFrom(
      this.apiService.getDashboardsList(),
    );

    this._dashboards.set(dashboards);
  }

  public async loadDashboardContent(dashboardId: string) {
    if (this._currentDashboardId() !== dashboardId) {
      const content = await firstValueFrom(
        this.apiService.getDashboardById(dashboardId),
      );

      this._currentDashboardId.set(dashboardId);
      this._content.set(content);
    }
  }

  public async initializeDashboard(dashboardId?: string, tabId?: string) {
    if (this._dashboards().length === 0) return;

    const validDashboardId = this.getValidDashboardId(dashboardId);

    await this.loadDashboardContent(validDashboardId);

    const validTabId = this.getValidTabId(tabId);

    const newPath = [
      AppRoutes.Dashboard.Root,
      validDashboardId,
      ...(validTabId ? [validTabId] : []),
    ];

    return newPath;
  }

  private getValidTabId(id?: string): string | null {
    const tabs = this._content().tabs;

    if (tabs.length === 0) {
      return null;
    }

    if (!id || !tabs.some((t) => t.id === id)) {
      return tabs[0].id;
    }

    return id;
  }

  private getValidDashboardId(id?: string): string {
    const dashboards = this._dashboards();

    return !id || !dashboards.some((d) => d.id === id) ? dashboards[0].id : id;
  }
}
