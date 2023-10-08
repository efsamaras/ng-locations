import { Component, OnInit } from '@angular/core';
import { GoogleLocation, LocationsService } from '../../services/locations.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    displayedColumns: string[] = ['name', 'latitude', 'longitude'];
    dataSource = new MatTableDataSource<GoogleLocation>([]);
    constructor(private locationsService: LocationsService) {}

    ngOnInit() {
        this.locationsService.getLocations().then((locations) => {
            this.dataSource.data = locations;
        });
    }
}
