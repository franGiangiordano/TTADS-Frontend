import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BateaFormComponent } from './batea.form.component';
import { NotificationService } from '../../../../../../projects/common/src/services/notification.service';
import { BateaService } from '../../services/batea.service';

describe('BateaFormComponent', () => {
    let component: BateaFormComponent;
    let fixture: ComponentFixture<BateaFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [BateaFormComponent],
            providers: [NotificationService, MatSnackBar, BateaService]
        });
        fixture = TestBed.createComponent(BateaFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
