import { ElementRef } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const element = document.createElement('div');
    const elementRef = new ElementRef(element);
    const directive = new Highlight(elementRef);
    expect(directive).toBeTruthy();
  });
});
