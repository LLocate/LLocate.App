import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraystring'
})
export class ArraystringPipe implements PipeTransform {

  transform(value: string[]): any {
    return value.join(", ");
  }

}
