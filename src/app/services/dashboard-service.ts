import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '@services/auth-service';
import type {
  DashboardItem,
  DashboardContent,
} from '@typings/dashboard/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly _dashboards = signal<DashboardItem[]>([]);
  private readonly _content = signal<DashboardContent>({ tabs: [] });
  private readonly _currentDashboardId = signal<string | null>(null);

  public readonly content = this._content.asReadonly();
  public readonly dashboards = this._dashboards.asReadonly();

  constructor() {
    this.authService.isAuthed$
      .pipe(filter((isAuthed) => isAuthed))
      .subscribe(async () => {
        await this.loadDashboards();
      });
  }

  public async loadDashboards() {
    try {
      const dashboards = await lastValueFrom(
        this.http.get<DashboardItem[]>('/dashboards'),
      );

      this._dashboards.set(dashboards);

      return dashboards;
    } catch {
      return [];
    }
  }

  public async loadDashboardContent(dashboardId: string) {
    if (this._currentDashboardId() === dashboardId) {
      return this._content();
    }

    try {
      const content = await lastValueFrom(
        this.http.get<DashboardContent>(`/dashboards/${dashboardId}`),
      );

      this._content.set(content);
      this._currentDashboardId.set(dashboardId);

      return content;
    } catch {
      const empty = { tabs: [] };

      this._content.set(empty);
      this._currentDashboardId.set(null);

      return empty;
    }
  }

  public async initializeDashboard(dashboardId?: string, tabId?: string) {
    if (this._dashboards().length === 0) return;

    const validDashboardId = this.getValidDashboardId(dashboardId);

    await this.loadDashboardContent(validDashboardId);

    const validTabId = this.getValidTabId(tabId);

    const newPath = [
      'dashboard',
      validDashboardId,
      ...(validTabId ? [validTabId] : []),
    ];

    await this.navigateIfNeeded(newPath);
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

  private async navigateIfNeeded(path: string[]) {
    const targetUrl = this.router.createUrlTree(path).toString();

    if (this.router.url !== targetUrl) {
      await this.router.navigate(path, { replaceUrl: true });
    }
  }
}
