import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleLocation, LocationsService } from '../../services/locations.service';
import { GoogleApisService } from '../../services/google-apis.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
    @ViewChildren(MapMarker) mapMarkers: QueryList<MapMarker>;

    apiLoaded: Observable<boolean>;
    options: google.maps.MapOptions = {
        center: { lat: 40, lng: 25 },
        zoom: 4,
    };
    locations: GoogleLocation[] = [];
    mapInfoContent = '';

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

    onMarkerClick(markerIndex: number, location: GoogleLocation) {
        const mapMarker = this.mapMarkers.get(markerIndex);
        if (mapMarker) {
            this.mapInfoContent = location.name;
            this.infoWindow.open(mapMarker);
        }
    }
}
