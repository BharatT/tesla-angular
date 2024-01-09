import { TestBed } from '@angular/core/testing';

import { ModelColorService } from './model-color.service';

describe('ModelColorService', () => {
  let service: ModelColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
