import {Injectable, Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterArrayPipe implements PipeTransform {
  public transform(values: any[], filter: string): any[] {
    if (!values || !values.length) return [];
    if (!filter) return values;
    // Filter items array, items which match will return true
    return values.filter(v => v.userName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}
