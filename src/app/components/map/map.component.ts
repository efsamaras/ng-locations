import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
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
export class MapComponent implements OnInit, OnDestroy {
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
    mapMarkers: google.maps.Marker[] = [];
    heatmap: google.maps.visualization.HeatmapLayer;
    selectedLocation: MapLocation | null;
    mapInfoContent = '';
    infoWindow: google.maps.InfoWindow;
    markerClusterer: MarkerClusterer;

    private zoomChangedListener: google.maps.MapsEventListener;

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

    ngOnDestroy() {
        if (this.zoomChangedListener) {
            google.maps.event.removeListener(this.zoomChangedListener);
        }
    }

    initMap(): void {
        this.ngZone.runOutsideAngular(() => {
            this.map = new google.maps.Map(this.mapElement.nativeElement, this.options);
            this.infoWindow = new google.maps.InfoWindow();
            this.map.addListener('idle', () => {
                this.initMarkers();
                this.onZoomChanged();
                // this.initHeatmapLayer();
            });
        });
    }

    initMarkers() {
        this.mapMarkers = this.createMarkers();

        const clusterOptions = {
            map: this.map,
            markers: this.mapMarkers,
            algorithm: new SuperClusterAlgorithm({
                radius: 300,
                minPoints: 3,
            }),
        };

        this.markerClusterer = new MarkerClusterer(clusterOptions);
    }

    createMarkers() {
        const bounds = this.map.getBounds();
        return this.locations
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
    }

    initHeatmapLayer() {
        const bounds = this.map.getBounds();
        const heatmapData = this.locations
            .filter((location) => !bounds || bounds.contains(location.coordinates))
            .map((location) => new google.maps.LatLng(location.coordinates.lat, location.coordinates.lng));
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            radius: 20,
            dissipating: true,
            map: this.map,
        });
    }

    onZoomChanged() {
        this.zoomChangedListener = this.map.addListener('zoom_changed', () => {
            this.markerClusterer.clearMarkers(true);
            this.mapMarkers = this.createMarkers();

            this.markerClusterer.addMarkers(this.mapMarkers, true);
            this.markerClusterer.render();
        });
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
