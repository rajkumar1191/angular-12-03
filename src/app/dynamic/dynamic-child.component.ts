import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-child',
  standalone: true,
  template: '<div style="border: 1px solid #2196f3; padding: .5rem; border-radius: .3rem; margin-top:.7rem;">Dynamic child loaded.</div>',
})
export class DynamicChildComponent {}
