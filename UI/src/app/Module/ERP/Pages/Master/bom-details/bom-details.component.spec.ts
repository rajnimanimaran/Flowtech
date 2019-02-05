import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOMDetailsComponent } from './bom-details.component';

describe('BOMDetailsComponent', () => {
  let component: BOMDetailsComponent;
  let fixture: ComponentFixture<BOMDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOMDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOMDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
