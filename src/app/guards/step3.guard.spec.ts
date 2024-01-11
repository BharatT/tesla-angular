import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActivateStep3 } from './step3.guard';

describe('step3Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActivateStep3(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
