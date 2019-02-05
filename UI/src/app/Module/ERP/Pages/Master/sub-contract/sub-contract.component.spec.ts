import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubContractComponent } from './sub-contract.component';

describe('SubContractComponent', () => {
  let component: SubContractComponent;
  let fixture: ComponentFixture<SubContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
