import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { createAction, createReducer, on, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface CounterState {
  count: number;
}

export const initialCounterState: CounterState = {
  count: 0,
};

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

export const counterReducer = createReducer(
  initialCounterState,
  on(increment, (state) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state) => ({ ...state, count: Math.max(0, state.count - 1) })),
  on(reset, () => initialCounterState)
);

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class CounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<{ counter: CounterState }>) {
    this.count$ = store.select((state) => state.counter.count);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
