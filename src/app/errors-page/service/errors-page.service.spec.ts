import { TestBed } from '@angular/core/testing';

import { ErrorsPageService } from './errors-page.service';

describe('ErrorsPageService', () => {
  let service: ErrorsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
