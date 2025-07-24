import { TuiRoot } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';
import { TabSwitcher } from './components/tab-switcher/tab-switcher';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, Sidebar, Dashboard, TabSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly menuItems = [
    {
      label: 'Overview',
      icon: 'dashboard',
      disabled: false,
    },
    {
      label: 'About',
      icon: 'info',
      disabled: true,
    },
  ];
}
