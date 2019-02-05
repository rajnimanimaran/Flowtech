import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOMMasterComponent } from './bom-master.component';

describe('BOMMasterComponent', () => {
  let component: BOMMasterComponent;
  let fixture: ComponentFixture<BOMMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOMMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOMMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
