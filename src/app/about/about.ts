import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Service } from '../service/service';

@Component({
  selector: 'app-about',
  imports: [Service],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() data: string = '';

  @ContentChild('content') content: any;

  // Example runtime state for DoCheck and OnChanges
  previousData: string = '';
  checkCount = 0;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called', changes);
    if (changes['data']) {
      // Real-time use case: respond to input property changes (e.g., parent feed updates)
      console.log('About.data changed from', changes['data'].previousValue, 'to', changes['data'].currentValue);
    }
  }

  constructor() {
    console.log('About component created');
  }

  getCurrentYear(data: string) {
    console.log('Current year:', new Date().getFullYear(), data);
  }

  ngOnInit(): void {
    // Real-time use case: initialize remote data or form state after first render
    console.log('ngOnInit called - setup initial subscriptions / fetch');
  }

  ngDoCheck(): void {
    // Real-time use case: custom dirty-check for expensive objects not covered by default change detection
    this.checkCount++;
    if (this.previousData !== this.data) {
      // console.log('ngDoCheck sees data changed (manually tracked) from', this.previousData, 'to', this.data);
      this.previousData = this.data;
    }
    // console.log('ngDoCheck called count', this.checkCount);
  }

  ngAfterContentInit(): void {
    // Real-time use case: act when projected content is ready (e.g., user-provided template in <ng-content>)
    console.log('ngAfterContentInit called', this.content);
  }

  ngAfterContentChecked(): void {
    // Real-time use case: verify projected content stabilization, update derived state
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    // Real-time use case: interact with child view components / template refs for one-time DOM work
    console.log('ngAfterViewInit called - view children are initialized');
  }

  ngAfterViewChecked(): void {
    // Real-time use case: detect and respond to view updates after change detection, e.g., analytics or layout adjustment
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy(): void {
    // Real-time use case: cleanup subscriptions/timers to prevent leaks
    console.log('ngOnDestroy called - cleanup subscriptions and resources');
  }

}
