import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPopUpComponent } from './supplier-pop-up.component';

describe('SupplierPopUpComponent', () => {
  let component: SupplierPopUpComponent;
  let fixture: ComponentFixture<SupplierPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
