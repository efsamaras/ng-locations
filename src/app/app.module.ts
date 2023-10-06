import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, MapComponent, TableComponent],
    imports: [BrowserModule, AppRoutingModule, MatListModule, MatToolbarModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
