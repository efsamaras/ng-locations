import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GoogleApisService {
    loaded: Observable<boolean>;
    private API_KEY = '';
    constructor(http: HttpClient) {
        this.loaded = http.jsonp('https://maps.googleapis.com/maps/api/js?key=' + this.API_KEY, 'callback').pipe(
            map(() => true),
            catchError((e) => {
                console.error(e);
                return of(false);
            })
        );
    }
}
