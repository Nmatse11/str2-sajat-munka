import { TestBed } from '@angular/core/testing';

import { HuntextService } from './huntext.service';

describe('HuntextService', () => {
  let service: HuntextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuntextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
