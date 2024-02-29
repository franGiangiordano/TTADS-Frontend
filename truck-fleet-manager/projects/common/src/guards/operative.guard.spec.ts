import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { operativeGuard } from './operative.guard';

describe('operativeGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => operativeGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
