import { Pipe, type PipeTransform } from '@angular/core';
import type { SensorItemValue } from '@/types';

@Pipe({
  name: 'sensorValue',
})
export class SensorValue implements PipeTransform {
  transform({ amount, unit }: SensorItemValue): string {
    return `${amount} ${unit}`;
  }
}
