import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AppLoginService } from './app-login.service';

describe('AppLoginService', () => {
    let service: AppLoginService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                JwtHelperService,
                { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
            ]
        });
        service = TestBed.inject(AppLoginService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
