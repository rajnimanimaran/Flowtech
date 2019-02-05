import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfOrganizationLevelComponent } from './list-of-organization-level.component';

describe('ListOfOrganizationLevelComponent', () => {
  let component: ListOfOrganizationLevelComponent;
  let fixture: ComponentFixture<ListOfOrganizationLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfOrganizationLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfOrganizationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
