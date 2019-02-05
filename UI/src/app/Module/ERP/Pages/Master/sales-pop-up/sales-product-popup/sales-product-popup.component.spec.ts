import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProductPopupComponent } from './sales-product-popup.component';

describe('SalesProductPopupComponent', () => {
  let component: SalesProductPopupComponent;
  let fixture: ComponentFixture<SalesProductPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesProductPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
