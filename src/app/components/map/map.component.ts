import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsService } from '../../services/locations.service';
import { GoogleApisService } from '../../services/google-apis.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

export interface MapLocation {
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

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
    locations: MapLocation[] = [];
    selectedLocation: MapLocation | null;
    mapInfoContent = '';

    constructor(
        private locationsService: LocationsService,
        googleApisService: GoogleApisService
    ) {
        this.apiLoaded = googleApisService.loaded;
    }

    ngOnInit() {
        this.locationsService.getLocations().then((locations) => {
            this.locations = locations.map((location) => {
                return {
                    name: location.name,
                    coordinates: {
                        lat: location.coordinates.lat,
                        lng: location.coordinates.lng,
                    },
                };
            });
        });
    }

    onMarkerClick(markerIndex: number, location: MapLocation) {
        const mapMarker = this.mapMarkers.get(markerIndex);
        if (mapMarker) {
            this.selectedLocation = location;
            this.mapInfoContent = location.name;
            this.infoWindow.open(mapMarker);
        }
    }

    onMapInfoClosed() {
        this.selectedLocation = null;
    }
}
