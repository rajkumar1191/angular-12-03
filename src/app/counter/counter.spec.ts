import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { CounterComponent, counterReducer } from './counter';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [provideStore({ counter: counterReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the counter component', () => {
    expect(component).toBeTruthy();
  });

  it('should increment and decrement count', async () => {
    const initial = await firstValueFrom(component.count$);
    component.increment();
    const incremented = await firstValueFrom(component.count$);
    expect(incremented).toBe(initial + 1);

    component.decrement();
    const decremented = await firstValueFrom(component.count$);
    expect(decremented).toBe(initial);
  });
});
