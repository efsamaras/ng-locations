import { TestBed } from '@angular/core/testing';

import { LocationsService } from './locations.service';
import { HttpClientModule } from '@angular/common/http';

describe('LocationsService', () => {
    let service: LocationsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(LocationsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
