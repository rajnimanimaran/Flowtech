import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderMasterComponent } from './work-order-master.component';

describe('WorkOrderMasterComponent', () => {
  let component: WorkOrderMasterComponent;
  let fixture: ComponentFixture<WorkOrderMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
