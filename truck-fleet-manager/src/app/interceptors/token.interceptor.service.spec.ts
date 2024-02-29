import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor.service';
import { NotificationService } from '../../../projects/common/src';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('TokenInterceptorService', () => {
    let service: TokenInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [NotificationService, MatSnackBar] });
        service = TestBed.inject(TokenInterceptor);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
