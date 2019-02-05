import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrdermainComponent } from './sales-ordermain.component';

describe('SalesOrdermainComponent', () => {
  let component: SalesOrdermainComponent;
  let fixture: ComponentFixture<SalesOrdermainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrdermainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrdermainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
