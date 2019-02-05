import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSupplierPopupComponent } from './sales-supplier-popup.component';

describe('SalesSupplierPopupComponent', () => {
  let component: SalesSupplierPopupComponent;
  let fixture: ComponentFixture<SalesSupplierPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSupplierPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSupplierPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
