import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-feature',
  standalone: true,
  template: `
    <section style="padding:1rem; border:2px dashed #8bc34a; border-radius:.75rem;">
      <h3>Lazy Loaded Feature Module</h3>
      <p>This module is loaded on demand when navigating to /lazy-feature.</p>
    </section>
  `,
})
export class LazyFeatureComponent {}
