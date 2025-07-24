import { computed, Injectable, signal } from '@angular/core';
import { MOCK_DATA } from '@/shared/mocks/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TabsState {
  public readonly activeTabIndex = signal(0);
  public readonly activeTab = computed(() => this.tabs[this.activeTabIndex()]);
  public readonly currentTabContent = computed(() => this.activeTab().cards);
  public readonly tabs = this.getTabsData();

  public getTabsData() {
    return MOCK_DATA.tabs;
  }
}
