import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], key: string, direction: number): any[] {
    if (!Array.isArray(value) || !key) {
      return value
    }
    return value.sort((a, b) => {
      if (direction === 1) {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return a[key] - b[key]
      } else {
        return a[key].toString().toLowerCase().localeCompare(b[key].toString().toLowerCase())
      }
    }
    else if (direction === -1) {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return b[key] - a[key]
      } else {
        return b[key].toString().toLowerCase().localeCompare(a[key].toString().toLowerCase())
      }
  }
  })

  }
}
