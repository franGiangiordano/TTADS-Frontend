import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form.component';
import { AppLoginService } from '../../../../../projects/common/src';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            providers: [AppLoginService, FormBuilder, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },],
            imports: [RouterTestingModule, HttpClientTestingModule]
        });
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
