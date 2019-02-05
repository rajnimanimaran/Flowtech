import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRawmaterialComponent } from './stock-rawmaterial.component';

describe('StockRawmaterialComponent', () => {
  let component: StockRawmaterialComponent;
  let fixture: ComponentFixture<StockRawmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockRawmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockRawmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
