import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { RepairFormComponent } from './repair.form.component';
import { RepairService } from '../../services/repair.service';
import { EquipmentService } from '../../../../../../projects/crud-equipment/src/lib/services/equipment.service';
import { NotificationService } from '../../../../../../projects/common/src';

describe('RepairFormComponent', () => {
    let component: RepairFormComponent;
    let fixture: ComponentFixture<RepairFormComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, RepairService, EquipmentService],
            declarations: [RepairFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
