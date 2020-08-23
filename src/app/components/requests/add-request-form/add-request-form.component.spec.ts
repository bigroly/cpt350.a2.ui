import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestFormComponent } from './add-request-form.component';

describe('AddRequestFormComponent', () => {
  let component: AddRequestFormComponent;
  let fixture: ComponentFixture<AddRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
