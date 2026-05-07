import { DOCUMENT, inject, InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window injection token', {
  factory: () => inject(DOCUMENT).defaultView!,
});
