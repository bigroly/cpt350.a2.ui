import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApprovalsComponent } from './list-approvals.component';

describe('ListApprovalsComponent', () => {
  let component: ListApprovalsComponent;
  let fixture: ComponentFixture<ListApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
