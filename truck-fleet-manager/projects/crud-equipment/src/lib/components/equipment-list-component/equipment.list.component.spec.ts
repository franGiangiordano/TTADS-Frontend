import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { EquipmentListComponent } from './equipment.list.component';
import { EquipmentService } from '../../services/equipment.service';
import { NotificationService } from '../../../../../../projects/common/src';

describe('EquipmentListComponent', () => {
    let component: EquipmentListComponent;
    let fixture: ComponentFixture<EquipmentListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, EquipmentService],
            declarations: [EquipmentListComponent]
        });
        fixture = TestBed.createComponent(EquipmentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
