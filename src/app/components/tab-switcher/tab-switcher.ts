import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiTabs } from '@taiga-ui/kit';
import { TabsState } from '@/services/tabs-state';

@Component({
  selector: 'app-tab-switcher',
  imports: [TuiTabs],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  protected readonly tabsState = inject(TabsState);
  protected tabs = this.tabsState.tabs;

  protected handleTabClick(index: number) {
    this.tabsState.activeTabIndex.set(index);
  }
}
