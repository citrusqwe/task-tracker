import { TestBed } from '@angular/core/testing';

import { AuthNotAuthrorizedGuard } from './auth-not-authrorized.guard';

describe('AuthNotAuthrorizedGuard', () => {
  let guard: AuthNotAuthrorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthNotAuthrorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
