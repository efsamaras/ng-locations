import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GoogleApisService {
    loaded: Observable<boolean>;
    constructor(http: HttpClient) {
        this.loaded = http
            .jsonp(
                'https://maps.googleapis.com/maps/api/js?key=' +
                    environment.apiKey +
                    '&callback=initMap&libraries=visualization',
                'callback'
            )
            .pipe(
                map(() => true),
                catchError((e) => {
                    console.error(e);
                    return of(false);
                })
            );
    }
}
