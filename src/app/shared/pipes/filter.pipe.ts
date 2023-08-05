import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], terminoBusqueda): any[] {
    return value.filter((v) =>
      v.title.toLocaleLowerCase().includes(terminoBusqueda)
    );
  }
}
