import { computed, Injectable, signal } from '@angular/core';
import { MOCK_DATA } from '@/shared/mocks/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TabsState {
  public readonly activeTabIndex = signal(0);
  public readonly activeTabContent = computed(
    this.getActiveTabContent.bind(this),
  );
  public readonly tabs = this.getTabsData();

  public getTabsData() {
    return MOCK_DATA.tabs;
  }

  private getActiveTabContent() {
    return this.tabs[this.activeTabIndex()].cards;
  }
}
