import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RepairService } from './repair.service';

describe('Service: Repair', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RepairService]
        });
    });

    it('should ...', inject([RepairService], (service: RepairService) => {
        expect(service).toBeTruthy();
    }));
});
