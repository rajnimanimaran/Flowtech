import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdermainComponent } from './purchase-ordermain.component';

describe('PurchaseOrdermainComponent', () => {
  let component: PurchaseOrdermainComponent;
  let fixture: ComponentFixture<PurchaseOrdermainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdermainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdermainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
