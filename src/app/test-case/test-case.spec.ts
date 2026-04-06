import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCase } from './test-case';

describe('TestCase', () => {
  let component: TestCase;
  let fixture: ComponentFixture<TestCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
