import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiTabs } from '@taiga-ui/kit';
import type { NavigationTab } from '@typings/data/interfaces';

@Component({
  selector: 'app-tab-switcher',
  imports: [TuiTabs, RouterLink, RouterLinkActive],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  public tabs = input.required<NavigationTab[]>();
}
