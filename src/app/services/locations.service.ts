import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, of } from 'rxjs';

export interface LocationModel {
    coordinates: [number, number];
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class LocationsService {
    private jsonUrl = 'assets/locations.json';
    constructor(private http: HttpClient) {}

    getLocations(): Promise<LocationModel[]> {
        const source$ = this.http.get(this.jsonUrl).pipe(
            map((response) => {
                return response as LocationModel[];
            }),
            catchError((error) => {
                console.log(error);
                return of([]);
            })
        );

        return firstValueFrom(source$);
    }
}
