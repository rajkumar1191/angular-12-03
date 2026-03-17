import { AfterContentInit, Component, ContentChild, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Service } from '../service/service';

@Component({
  selector: 'app-about',
  imports: [Service],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnChanges, OnInit, AfterContentInit {

  @Input() data: string = '';

  @ContentChild('content') content: any;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called', changes);
  }

  constructor() {
    console.log('About component created');
  }

  getCurrentYear(data: string) {
    console.log('Current year:', new Date().getFullYear(), data);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
    console.log('Content:', this.content);
  }

  


}
