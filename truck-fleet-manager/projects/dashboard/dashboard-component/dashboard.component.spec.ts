import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DriverService } from '../../../projects/crud-drivers/src/lib/services/driver.service';
import { BateaService } from '../../../projects/crud-bateas/src/lib/services/batea.service';
import { TrailerService } from '../../../projects/crud-trailers/src/lib/services/trailer.service';
import { TravelService } from '../../../projects/crud-travels/src/lib/services/travel.service';
import { EquipmentService } from '../../../projects/crud-equipment/src/lib/services/equipment.service';
import { RepairService } from '../../../projects/crud-repairs/src/lib/services/repair.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DashboardComponent],
            providers: [
                DriverService,
                BateaService,
                TrailerService,
                TravelService,
                EquipmentService,
                RepairService]
        });
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
