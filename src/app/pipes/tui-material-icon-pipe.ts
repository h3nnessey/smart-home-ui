import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'tuiMaterialIcon',
})
export class TuiMaterialIconPipe implements PipeTransform {
  transform(value: string): string {
    return `@tui.material.filled.${value}`;
  }
}
