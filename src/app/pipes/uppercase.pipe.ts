import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper'
})

export class UppercasePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value.toUpperCase()
  }
}