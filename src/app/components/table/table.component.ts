import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface TableLocation {
    name: string;
    latitude: number;
    longitude: number;
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['name', 'latitude', 'longitude'];
    dataSource = new MatTableDataSource<TableLocation>([]);
    constructor(private locationsService: LocationsService) {}

    ngOnInit() {
        this.locationsService.getLocations().then((locations) => {
            this.dataSource.data = locations.map((location) => {
                return {
                    name: location.name,
                    latitude: location.coordinates.lat,
                    longitude: location.coordinates.lng,
                };
            });
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
