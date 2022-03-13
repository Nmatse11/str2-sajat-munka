import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textoverflow'
})
export class TextoverflowPipe implements PipeTransform {

  //A kérdés lerövdítése, hogy ne lehessen az admin táblában azonnal elolvasni
  transform(value: string, long:number): unknown {
    return `${value.slice(0,long)}...`;
  }

}
