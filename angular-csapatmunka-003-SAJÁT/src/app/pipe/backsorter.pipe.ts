import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backsorter'
})
export class BacksorterPipe implements PipeTransform {

  transform(value: any[], key: string): any[] {
    if (!Array.isArray(value) || !key) {
      return value
    }
    return value.sort((a, b) => {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return b[key] - a[key]
      } else {
        return b[key].toString().toLowerCase().localeCompare(a[key].toString().toLowerCase())
      }

    })
  }

}
