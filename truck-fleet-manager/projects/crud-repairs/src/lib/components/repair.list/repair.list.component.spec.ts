import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { RepairlistComponent } from './repair.list.component';
import { NotificationService } from '../../../../../../projects/common/src';
import { RepairService } from '../../services/repair.service';

describe('RepairlistComponent', () => {
    let component: RepairlistComponent;
    let fixture: ComponentFixture<RepairlistComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NotificationService, MatSnackBar, RepairService],
            declarations: [RepairlistComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepairlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
