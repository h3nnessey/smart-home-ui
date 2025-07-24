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
  protected readonly isMobile = computed(() => this.windowWidth() < 1024);
  protected readonly windowWidth = signal(0);

  constructor() {
    this.windowWidth.set(window.innerWidth);
  }

  public handleResize(event: Event) {
    const width = (event.target as Window).innerWidth;

    this.windowWidth.set(width);
  }

  public toggleSidebar() {
    this.isOpen.update((value) => !value);
  }

  public get buttonIcon() {
    return this.isOpen()
      ? `@tui.material.filled.close`
      : `@tui.material.filled.menu`;
  }
}
