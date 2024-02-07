import { TestBed } from '@angular/core/testing';

import { LibUiService } from './lib-ui.service';

describe('LibUiService', () => {
  let service: LibUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
