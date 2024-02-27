import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { EquipmentFormComponent } from './equipment.form.component';
import { EquipmentService } from '../../services/equipment.service';
import { NotificationService } from '../../../../../../projects/common/src';
import { BateaService } from '../../../../../../projects/crud-bateas/src/lib/services/batea.service';
import { DriverService } from '../../../../../../projects/crud-drivers/src/lib/services/driver.service';
import { TrailerService } from '../../../../../../projects/crud-trailers/src/lib/services/trailer.service';

describe('EquipmentFormComponent', () => {
    let component: EquipmentFormComponent;
    let fixture: ComponentFixture<EquipmentFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, TrailerService, DriverService, BateaService, EquipmentService],
            declarations: [EquipmentFormComponent]
        });
        fixture = TestBed.createComponent(EquipmentFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
