import { TestBed, inject } from '@angular/core/testing';

import { HeaderStorageService } from './header-storage.service';

describe('HeaderStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderStorageService]
    });
  });

  it('should be created', inject([HeaderStorageService], (service: HeaderStorageService) => {
    expect(service).toBeTruthy();
  }));
});
