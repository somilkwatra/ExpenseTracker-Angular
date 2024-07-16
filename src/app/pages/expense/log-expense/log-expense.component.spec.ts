import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExpenseComponent } from './log-expense.component';

describe('LogExpenseComponent', () => {
  let component: LogExpenseComponent;
  let fixture: ComponentFixture<LogExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
