import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class Highlight {
  @Input() appHighlight = {
    color: 'yellow',
    fontSize: '20px',
  };

  constructor(private el: ElementRef) {}

  @HostBinding('style.backgroundColor') backgroundColor = '';
  @HostBinding('style.fontSize') fontSize = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = this.appHighlight.color || 'yellow';
    this.fontSize = this.appHighlight.fontSize || '20px';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = '';
    this.fontSize = '';
  }
}
