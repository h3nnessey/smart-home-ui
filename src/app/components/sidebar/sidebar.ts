import { Component, computed, signal } from '@angular/core';
import { TuiAutoColorPipe, TuiButton } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
  selector: 'app-sidebar',
  imports: [TuiHeader, TuiButton, TuiAvatar, TuiAutoColorPipe],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  host: {
    '(window:resize)': 'handleResize($event)',
  },
})
export class Sidebar {
  protected readonly isOpen = signal(true);
  protected readonly isMobile = computed(this.isMobileView.bind(this));
  protected readonly windowWidth = signal(0);
  private readonly mobileBreakpoint = 1024;

  constructor() {
    this.windowWidth.set(window.innerWidth);
    this.isOpen.set(!this.isMobileView());
  }

  public handleResize(event: Event) {
    const width = this.getWindowWidth(event.target as Window);

    this.isOpen.set(width < this.mobileBreakpoint ? false : true);
    this.windowWidth.set(width);
  }

  public toggleSidebar() {
    this.isOpen.update((value) => !value);
  }

  private getWindowWidth(window: Window) {
    return window.innerWidth;
  }

  private isMobileView(width = 1024) {
    return this.windowWidth() < width;
  }

  public get buttonIcon() {
    return this.isOpen()
      ? `@tui.material.filled.close`
      : `@tui.material.filled.menu`;
  }
}
