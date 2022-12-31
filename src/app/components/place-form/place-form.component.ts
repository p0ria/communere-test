import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { BehaviorSubject, finalize } from 'rxjs';
import { PlaceService } from 'src/app/services/place.service';
import { PlaceTypes } from 'src/app/types/place-type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent implements OnInit, AfterViewInit {
  @Input() location: { lng: number; lat: number };
  @Output() $close = new EventEmitter<void>();
  form: FormGroup;
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  isSaving$ = new BehaviorSubject(false);
  @ViewChild('mapContainer') mapElRef: ElementRef;
  @ViewChild('logoInput')
  logoInputElRef: ElementRef<HTMLInputElement>;
  PlaceTypes = PlaceTypes;

  constructor(private placeService: PlaceService, fb: FormBuilder) {
    this.form = fb.group({
      name: [null, Validators.required],
      lng: [null, Validators.required],
      lat: [null, Validators.required],
      type: [null, Validators.required],
      logo: [null],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: this.mapElRef.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 7,
        center: [this.location.lng, this.location.lat],
        doubleClickZoom: false,
      });

      this.map.on('click', (e) => this.setMarker(e.lngLat.lng, e.lngLat.lat));
      this.setMarker(this.location.lng, this.location.lat);
    });
  }

  setMarker(lng: number, lat: number) {
    if (this.marker) {
      this.marker.remove();
    }
    this.marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
    this.form.patchValue({
      lng,
      lat,
    });
  }

  async onLogoSelect(files: File[]) {
    if (files?.length) {
      const logo = await files[0].convertToBase64();
      this.form.patchValue({ logo });
    }
  }

  removeLogo() {
    this.logoInputElRef.nativeElement.value = null;
    this.form.patchValue({ logo: null });
  }

  save() {
    if (this.form.valid) {
      this.isSaving$.next(true);
      this.placeService
        .addPlace(this.form.value)
        .pipe(finalize(() => this.isSaving$.next(false)))
        .subscribe({
          next: () => this.close(),
          error: (err) => alert(err),
        });
    }
  }

  close() {
    this.$close.emit();
  }
}
