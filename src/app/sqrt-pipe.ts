import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sqrt',
  standalone: true,
  pure: true
})

export class SqrtPipe implements PipeTransform {

  transform(value: any) {
    console.log('SqrtPipe called with value:', value);
    return value >= 0 ? Math.sqrt(value) : 'Invalid input';
  }

}
