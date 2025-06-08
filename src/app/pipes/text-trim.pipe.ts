import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTrim'
})
export class TextTrimPipe implements PipeTransform {

  transform(value: string ,maxLength : number = 20 , ...args: unknown[]): string {
    if(!value) {
      return "";
    }else {
      if(value.length > maxLength) {
        return value.substring(0, maxLength) + '...';
      }
    }
    return value;
  }

}
