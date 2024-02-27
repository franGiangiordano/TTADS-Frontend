import { TestBed, inject } from '@angular/core/testing';
import { DriverService } from './driver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Driver', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DriverService]
        });
    });

    it('should ...', inject([DriverService], (service: DriverService) => {
        expect(service).toBeTruthy();
    }));
});
