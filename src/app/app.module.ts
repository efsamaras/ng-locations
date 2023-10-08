import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    declarations: [AppComponent, NavbarComponent, MapComponent, TableComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GoogleMapsModule,
        HttpClientJsonpModule,
        HttpClientModule,
        MatListModule,
        MatTableModule,
        MatToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
