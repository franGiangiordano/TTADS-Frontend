import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Location } from '@angular/common';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormComponent],
            providers: [FormBuilder, DateAdapter, Location]
        });
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
