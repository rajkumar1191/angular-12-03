import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { counterReducer } from '../counter/counter';
import { formDataReducer } from '../store/form-data.reducer';
import { StateStrategyDemo } from './state-strategy-demo';

describe('StateStrategyDemo', () => {
  let component: StateStrategyDemo;
  let fixture: ComponentFixture<StateStrategyDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateStrategyDemo],
      providers: [provideStore({ counter: counterReducer, formData: formDataReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(StateStrategyDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should modify local, signal, and store counters', () => {
    expect(component.localCount).toBe(0);
    component.incLocal();
    expect(component.localCount).toBe(1);

    expect(component.signalCount()).toBe(0);
    component.incSignal();
    expect(component.signalCount()).toBe(1);

    component.incStore();
    component.storeCount$.subscribe((value) => expect(value).toBe(1)).unsubscribe();
  });
});
