import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DriverFormComponent } from './driver.form.component';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../../../../projects/common/src';

describe('DriverFormComponent', () => {
    let component: DriverFormComponent;
    let fixture: ComponentFixture<DriverFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, DriverService],
            declarations: [DriverFormComponent]
        });
        fixture = TestBed.createComponent(DriverFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
