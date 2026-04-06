import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicChildComponent } from './dynamic-child.component';

@Component({
  selector: 'app-dynamic-host',
  standalone: true,
  template: `
    <section style="border: 2px solid #ff9800; border-radius: .75rem; padding: 1rem; margin-top: 1rem;">
      <h3>Dynamic Component Loading</h3>
      <button (click)="loadChild()">Load child component</button>
      <button (click)="clearChild()" style="margin-left:.5rem;">Clear</button>
      <ng-container #placeholder></ng-container>
    </section>
  `,
})
export class DynamicHostComponent {
  @ViewChild('placeholder', { read: ViewContainerRef, static: true }) placeholder!: ViewContainerRef;

  loadChild() {
    this.placeholder.clear();
    this.placeholder.createComponent(DynamicChildComponent);
  }

  clearChild() {
    this.placeholder.clear();
  }
}
