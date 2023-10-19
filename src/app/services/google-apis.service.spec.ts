import { TestBed } from '@angular/core/testing';

import { GoogleApisService } from './google-apis.service';
import { HttpClientModule } from '@angular/common/http';

describe('GoogleApisService', () => {
    let service: GoogleApisService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(GoogleApisService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
