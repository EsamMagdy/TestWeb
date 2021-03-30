import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mathRound' })
export class MathRound implements PipeTransform {
  transform(value: any) {
    if (value) return Math.round(value);
    return 0;
  }
}
