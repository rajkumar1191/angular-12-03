import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Custom simple pipe: truncates text to a limit and adds ellipsis
@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength = 25): string {
    if (!value) {
      return '';
    }
    if (value.length <= maxLength) {
      return value;
    }
    return value.slice(0, maxLength) + '...';
  }
}

// Custom impure pipe example: reverses input string on every change-check
@Pipe({
  name: 'reverse',
  pure: false,
  standalone: true,
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.split('').reverse().join('') : '';
  }
}

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, LowerCasePipe, TitleCasePipe, CurrencyPipe, PercentPipe, JsonPipe, SlicePipe, AsyncPipe, TruncatePipe, ReversePipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.css',
})
export class PipesDemo {
  productName = 'angular lifecycle hooks and pipes';
  productPrice = 1234.56;
  createdAt = new Date();
  progress = 0.42;
  description = 'Pipes are a powerful mechanism to transform values in an Angular template. Built-in pipes cover most common tasks; custom pipes let you solve application-specific formatting needs.';
  heroList = ['Iron Man', 'Captain America', 'Black Panther', 'Hulk'];

  asyncItems = new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(['RxJS', 'Signals', 'Change Detection']), 1600);
  });

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      console.log('Route params:', params);
    });

    this.route.queryParams.subscribe((queryParams) => {
      console.log('Query params:', queryParams);
    });
  }

  // Example of calling a pipe-like transformation for inline code use, not template
  toUpperCase(value: string): string {
    return value.toUpperCase();
  }
}
