import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorInterceptor } from './error.interceptor';
import { NotificationService } from '../../../projects/common/src';

describe('ErrorInterceptor', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            ErrorInterceptor,
            NotificationService,
            MatSnackBar
        ]
    }));

    it('should be created', () => {
        const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
