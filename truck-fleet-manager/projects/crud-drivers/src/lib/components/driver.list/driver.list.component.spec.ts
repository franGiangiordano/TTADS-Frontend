import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { DriverListComponent } from './driver.list.component';
import { NotificationService } from '../../../../../../projects/common/src';
import { DriverService } from '../../services/driver.service';

describe('DriverListComponent', () => {
    let component: DriverListComponent;
    let fixture: ComponentFixture<DriverListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, DriverService],
            declarations: [DriverListComponent]
        });
        fixture = TestBed.createComponent(DriverListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
