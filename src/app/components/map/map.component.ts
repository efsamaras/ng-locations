import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleLocation, LocationsService } from '../../services/locations.service';
import { GoogleApisService } from '../../services/google-apis.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    apiLoaded: Observable<boolean>;
    options: google.maps.MapOptions = {
        center: { lat: 40, lng: 25 },
        zoom: 4,
    };

    locations: GoogleLocation[] = [];

    constructor(
        private locationsService: LocationsService,
        googleApisService: GoogleApisService
    ) {
        this.apiLoaded = googleApisService.loaded;
    }

    ngOnInit() {
        this.locationsService.getLocations().then((locations) => {
            this.locations = locations;
        });
    }

    onMarkerClick(location: GoogleLocation) {}
}
