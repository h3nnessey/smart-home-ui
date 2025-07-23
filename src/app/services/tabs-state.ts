import { Injectable, resource } from '@angular/core';
import type { GetTabItemsResponse } from '@/types';

@Injectable({
  providedIn: 'root',
})
export class TabsState {
  readonly tabsResource = resource({
    loader: () =>
      fetch('./mocks/mock-data.json')
        .then<GetTabItemsResponse>((res) => res.json())
        .catch(() => []),
    defaultValue: [],
  });
}
