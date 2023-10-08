import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, of } from 'rxjs';

export interface LocationModel {
    coordinates: [number, number];
    name: string;
}
export interface GoogleLocation {
    coordinates: {
        lat: number;
        lng: number;
    };
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class LocationsService {
    private jsonUrl = 'assets/locations.json';
    constructor(private http: HttpClient) {}

    getLocations(): Promise<GoogleLocation[]> {
        const source$ = this.http.get(this.jsonUrl).pipe(
            map((locations) => {
                const response = (locations as LocationModel[]).map((location) => {
                    return {
                        coordinates: {
                            lat: location.coordinates[0],
                            lng: location.coordinates[1],
                        },
                        name: location.name,
                    };
                });
                return response as GoogleLocation[];
            }),
            catchError((error) => {
                console.log(error);
                return of([]);
            })
        );

        return firstValueFrom(source$);
    }
}
