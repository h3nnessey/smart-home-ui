import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightElement]',
})
export class HighlightElement {
  protected readonly el = inject(ElementRef);
  protected readonly renderer2 = inject(Renderer2);
  public readonly shouldHighlight = input.required<boolean>({
    alias: 'appHighlightElement',
  });
  public readonly highlightColor = input('var(--tui-background-accent-2)');

  constructor() {
    effect(() => {
      if (this.el && this.shouldHighlight()) {
        this.highlightElement();
      } else {
        this.obscureElement();
      }
    });
  }

  private highlightElement() {
    this.renderer2.setStyle(
      this.el.nativeElement,
      'outline',
      `1px solid ${this.highlightColor()}`,
    );
  }

  private obscureElement() {
    this.renderer2.removeStyle(this.el.nativeElement, 'outline');
  }
}
