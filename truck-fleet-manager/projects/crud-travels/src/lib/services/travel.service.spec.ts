import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TravelService } from './travel.service';

describe('CrudTravelsService', () => {
    let service: TravelService;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
        service = TestBed.inject(TravelService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
