import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../counter/counter';
import { FormDataState } from '../store/form-data.reducer';

@Component({
  selector: 'app-state-strategy-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-strategy-demo.html',
  styleUrls: ['./state-strategy-demo.css'],
})
export class StateStrategyDemo {
  // 1) Local state (component-only)
  localCount = 0;

  // 2) Signal-based state
  signalCount = signal(0);

  // 3) NgRx store state (counter actions already defined)
  storeCount$: Observable<number>;

  constructor(private store: Store<{ counter: { count: number }; formData: FormDataState }>) {
    this.storeCount$ = this.store.select((state) => state.counter?.count ?? 0);
  }

  incLocal() {
    this.localCount += 1;
  }

  decLocal() {
    this.localCount -= 1;
  }

  incSignal() {
    this.signalCount.update((current) => current + 1);
  }

  decSignal() {
    this.signalCount.update((current) => current - 1);
  }

  incStore() {
    this.store.dispatch(increment());
  }

  decStore() {
    this.store.dispatch(decrement());
  }

  resetAll() {
    this.localCount = 0;
    this.signalCount.set(0);
    this.store.dispatch(reset());
  }
}
