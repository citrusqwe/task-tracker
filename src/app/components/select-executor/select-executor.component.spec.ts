import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExecutorComponent } from './select-executor.component';

describe('SelectExecutorComponent', () => {
  let component: SelectExecutorComponent;
  let fixture: ComponentFixture<SelectExecutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectExecutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
