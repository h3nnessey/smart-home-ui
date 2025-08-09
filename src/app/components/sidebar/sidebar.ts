import { Component, DestroyRef, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiMaterialIconPipe } from '@pipes/tui-material-icon-pipe';
import { AuthService } from '@services/auth-service';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarFooter } from './sidebar-footer/sidebar-footer';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

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
  private readonly authService = inject(AuthService);

  protected readonly isOpen = signal(true);
  protected readonly isMobile = signal(false);

  protected readonly headerTitle = 'Smart Home UI';

  constructor() {
    this.setupMediaQuery();
  }

  protected get isAuthed() {
    return this.authService.isAuthed;
  }

  protected get user() {
    return this.authService.user;
  }

  protected get icon() {
    return this.isOpen() ? 'close' : 'more_vert';
  }

  protected get title() {
    return this.isOpen() ? 'Close sidebar' : 'Open sidebar';
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

  public handleLogout() {
    this.authService.logout();
  }
}
