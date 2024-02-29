import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TrailerService } from './trailer.service';

describe('Service: Trailer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TrailerService]
        });
    });

    it('should create', inject([TrailerService], (service: TrailerService) => {
        expect(service).toBeTruthy();
    }));
});
