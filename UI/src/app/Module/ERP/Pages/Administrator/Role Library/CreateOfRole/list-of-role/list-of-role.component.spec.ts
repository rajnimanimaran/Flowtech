import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRoleComponent } from './list-of-role.component';

describe('ListOfRoleComponent', () => {
  let component: ListOfRoleComponent;
  let fixture: ComponentFixture<ListOfRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
