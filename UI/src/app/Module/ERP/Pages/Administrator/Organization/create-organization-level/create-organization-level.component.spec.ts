import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganizationLevelComponent } from './create-organization-level.component';

describe('CreateOrganizationLevelComponent', () => {
  let component: CreateOrganizationLevelComponent;
  let fixture: ComponentFixture<CreateOrganizationLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganizationLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganizationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
