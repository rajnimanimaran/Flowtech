import { TestBed, inject } from '@angular/core/testing';

import { NavBarMenuService } from './nav-bar-menu.service';

describe('NavBarMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavBarMenuService]
    });
  });

  it('should be created', inject([NavBarMenuService], (service: NavBarMenuService) => {
    expect(service).toBeTruthy();
  }));
});
