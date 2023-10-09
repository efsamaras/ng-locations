import { Component, Input } from '@angular/core';
import { MapLocation } from '../map/map.component';

@Component({
    selector: 'app-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
    @Input() location: MapLocation;
}
