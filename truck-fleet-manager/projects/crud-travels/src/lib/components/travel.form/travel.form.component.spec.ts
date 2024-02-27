import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TravelFormComponent } from './travel.form.component';
import { TravelService } from '../../services/travel.service';
import { NotificationService } from '../../../../../../projects/common/src';
import { EquipmentService } from '../../../../../../projects/crud-equipment/src/lib/services/equipment.service';

describe('TravelFormComponent', () => {
    let component: TravelFormComponent;
    let fixture: ComponentFixture<TravelFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [TravelFormComponent],
            providers: [TravelService, NotificationService, EquipmentService, NotificationService, MatSnackBar]
        });
        fixture = TestBed.createComponent(TravelFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
