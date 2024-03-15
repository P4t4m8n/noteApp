import { ChangeDetectorRef, Pipe, PipeTransform, inject } from '@angular/core';
interface indexable {
  [key: string]: any
}

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  cdr = inject(ChangeDetectorRef)
  transform<T>(items: T[], item: keyof T): T[] {
    return [...items.sort((a, b) => {
      return (b[item] === a[item]) ? 0 : b[item] ? 1 : -1;
    })]

  }

}
