import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PlaceService } from 'src/app/services/place.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  map: mapboxgl.Map;
  addPlaceFormOpen = false;
  addPlaceFormLocation: { lng: number; lat: number } = null;

  constructor(public placeService: PlaceService) {}

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 5,
      center: [54.45401027719555, 32.35924477033592],
      doubleClickZoom: false,
    });

    this.map.on('contextmenu', (e) =>
      this.showAddPlaceForm(e.lngLat.lng, e.lngLat.lat)
    );
  }

  showAddPlaceForm(lng: number, lat: number) {
    this.addPlaceFormLocation = { lng, lat };
    this.addPlaceFormOpen = true;
  }
}
