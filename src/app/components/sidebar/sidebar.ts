import { Component, DestroyRef, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiMaterialIconPipe } from '@/pipes/tui-material-icon-pipe';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarFooter } from './sidebar-footer/sidebar-footer';
import { SidebarMenu, type MenuItem } from './sidebar-menu/sidebar-menu';

const ITEMS: MenuItem[] = [
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

@Component({
  selector: 'app-sidebar',
  imports: [
    TuiButton,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    TuiMaterialIconPipe,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isOpen = signal(true);
  protected readonly isMobile = signal(false);
  protected readonly items = ITEMS;

  constructor() {
    this.setupMediaQuery();
  }

  private setupMediaQuery() {
    const query = globalThis.matchMedia('(max-width: 1024px)');

    this.handleMediaChange({ matches: query.matches });

    query.addEventListener('change', this.handleMediaChange);

    this.destroyRef.onDestroy(() => {
      query.removeEventListener('change', this.handleMediaChange);
    });
  }

  private handleMediaChange = ({ matches }: { matches: boolean }) => {
    this.isMobile.set(matches);
    this.isOpen.set(!matches);
  };

  public toggleSidebar() {
    this.isOpen.update((value) => !value);
  }

  public get icon() {
    return this.isOpen() ? 'close' : 'more_vert';
  }
}
