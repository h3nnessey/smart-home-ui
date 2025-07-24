import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightDevice]',
})
export class HighlightDevice {
  protected readonly el = inject(ElementRef);
  protected readonly renderer2 = inject(Renderer2);
  public readonly appHighlightDevice = input(false);

  constructor() {
    effect(() => {
      if (this.el && this.appHighlightDevice()) {
        this.renderer2.setStyle(
          this.el.nativeElement,
          'outline',
          '1px solid #626262',
        );
      } else {
        this.renderer2.removeStyle(this.el.nativeElement, 'outline');
      }
    });
  }
}
