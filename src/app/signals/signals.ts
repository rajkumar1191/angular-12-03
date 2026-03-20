import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, signal } from '@angular/core';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  imports: [CommonModule, NgFor, JsonPipe],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsDemo {
  // Angular Signal state (auto-updating in template)

  /*
    this.count() -> read signal value (auto-tracked in template)
    this.count.set(newValue) -> set signal value (triggers updates)
    this.count.update(updaterFn) -> update signal value based on current value
    this.count.asReadonly() -> expose read-only version of signal
    Signals are a new reactive primitive in Angular that allow you to create fine-grained reactive state.
    When you read a signal's value in the template, Angular automatically tracks that dependency.
    When the signal's value changes, Angular only updates the parts of the template that depend on it, without needing to run change detection for the entire component tree.

    writable signal with custom setter logic (e.g. validation, side effects)
    1. set -> set new value
    2. update -> get current value, compute new value, set new value
    3. asReadonly -> expose signal as read-only to outside world

    Computed Signal:
    A computed signal derives its value from other signals. It automatically tracks its dependencies and only recomputes when those dependencies change. This allows for efficient memoization and avoids unnecessary recalculations.

    Effect:
    An effect is a function that runs whenever the signals it depends on change. It's useful for running side effects in response to signal changes, such as logging, making HTTP requests, or updating non-Angular state. Effects are automatically cleaned up when the component is destroyed, preventing memory leaks.

*/
  count = signal(0);


  // Plain property not tied to Signals (legacy model) for comparison
  legacyCount = 0;

  // Derived executable value from signals (memoized)
  parity = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'));

  // List state as signal that can be mutated reactively
  items = signal<string[]>(['first', 'second']);

  // Effect tracks changes automatically and logs
  readonly logEffect = effect(() => {
    console.log('Signal count changed to', this.count());
  });

  constructor(private cdr: ChangeDetectorRef) {}

  incrementSignal() {
    this.count.update((value) => value + 1);
  }

  decrementSignal() {
    this.count.update((value) => value - 1);
  }

  incrementLegacy() {
    this.legacyCount += 1;
    // Without markForCheck this may not update the OnPush view in all scenarios.
    // This reveals the pain points of classic change detection.
  }

  incrementLegacyWithCheck() {
    this.legacyCount += 1;
    this.cdr.markForCheck(); // Manually trigger change detection for legacy property updates
  }

  addItem() {
    const i = this.items().length + 1;
    this.items.update((arr) => [...arr, `item-${i}`]);
  }

  removeItem() {
    this.items.update((arr) => arr.slice(0, -1));
  }

  explainSignalBenefits = [
    'Fine-grained reactive state that automatically triggers template updates when accessed values change.',
    'No need for manual `markForCheck()` or `detectChanges()` if template uses signals.',
    'Works nicely with OnPush strategy and avoids costly full-tree change detection scan.',
    'Computed values are memoized and only recompute when dependencies change.',
    '`effect()` can run side effects safely when certain signals change.',
  ];
}
