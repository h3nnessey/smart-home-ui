import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiRoutes } from '@shared/config/api';
import type {
  DashboardContent,
  DashboardItem,
} from '@typings/dashboard/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private readonly http = inject(HttpClient);

  public getDashboardsList() {
    return this.http
      .get<DashboardItem[]>(ApiRoutes.Dashboards)
      .pipe(catchError(() => of([])));
  }

  public getDashboardById(id: string) {
    return this.http
      .get<DashboardContent>(`${ApiRoutes.Dashboards}/${id}`)
      .pipe(catchError(() => of({ tabs: [] } satisfies DashboardContent)));
  }
}
