import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LocationsService } from '../../services/locations.service';
import { GoogleApisService } from '../../services/google-apis.service';
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';

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
    @ViewChild('mapElement', { static: true }) mapElement: ElementRef;
    apiLoaded: Observable<boolean>;
    map: google.maps.Map;
    options: google.maps.MapOptions = {
        center: { lat: 40, lng: 25 },
        zoom: 5,
        mapId: 'DEMO_MAP_ID',
        minZoom: 2,
    };
    locations: MapLocation[] = [];
    selectedLocation: MapLocation | null;
    mapInfoContent = '';
    infoWindow: google.maps.InfoWindow;
    markerClusterer: MarkerClusterer;

    constructor(
        private locationsService: LocationsService,
        googleApisService: GoogleApisService,
        private ngZone: NgZone
    ) {
        this.apiLoaded = googleApisService.loaded;
    }

    ngOnInit() {
        this.locationsService.getLocations().then((locations) => {
            this.locations = locations;
            this.apiLoaded.subscribe((loaded) => {
                if (loaded) {
                    this.initMap();
                }
            });
        });
    }

    initMap(): void {
        this.ngZone.runOutsideAngular(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.options);
            this.infoWindow = new google.maps.InfoWindow();
            this.map.addListener('idle', () => {
                this.createMarkers();
            });
        });
    }

    createMarkers() {
        const bounds = this.map.getBounds();
        const markers = this.locations
            .filter((location) => !bounds || bounds.contains(location.coordinates))
            .map((location) => {
                const marker = new google.maps.Marker({
                    position: location.coordinates,
                    title: location.name,
                    optimized: true,
                });

                marker.addListener('click', () => {
                    this.onMarkerClick(marker, location);
                });

                return marker;
            });

        const clusterOptions = {
            map: this.map,
            markers,
            algorithm: new SuperClusterAlgorithm({
                radius: 300,
                minPoints: 3,
            }),
        };

        this.markerClusterer = new MarkerClusterer(clusterOptions);
    }

    onMarkerClick(marker: google.maps.Marker, location: MapLocation) {
        if (marker) {
            this.ngZone.run(() => {
                this.selectedLocation = location;
            });
            this.mapInfoContent = location.name;
            this.infoWindow.setContent(location.name);
            this.infoWindow.open(this.map, marker);
        }
    }
}
