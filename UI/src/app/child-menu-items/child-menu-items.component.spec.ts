import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMenuItemsComponent } from './child-menu-items.component';

describe('ChildMenuItemsComponent', () => {
  let component: ChildMenuItemsComponent;
  let fixture: ComponentFixture<ChildMenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
