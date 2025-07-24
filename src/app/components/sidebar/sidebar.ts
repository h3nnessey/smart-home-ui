import { Component } from '@angular/core';
import { TuiAutoColorPipe, TuiButton } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
  selector: 'app-sidebar',
  imports: [TuiHeader, TuiButton, TuiAvatar, TuiAutoColorPipe],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {}
