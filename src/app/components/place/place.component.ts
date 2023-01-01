import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { BehaviorSubject, finalize } from 'rxjs';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/types/place.type';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceComponent implements OnInit {
  @Input() map: mapboxgl.Map;
  @Input() place: Place;
  form: FormGroup;
  marker: mapboxgl.Marker;
  isSaving$ = new BehaviorSubject(false);

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private placeService: PlaceService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      description: [null],
    });
  }

  ngOnInit(): void {
    const lngLat: mapboxgl.LngLatLike = [this.place.lng, this.place.lat];
    const popup = new mapboxgl.Popup().setDOMContent(this.elRef.nativeElement);
    this.marker = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(this.map);
    this.form.patchValue(this.place);
  }

  save() {
    this.isSaving$.next(true);
    this.placeService
      .editPlace({ ...this.place, ...this.form.value })
      .pipe(finalize(() => this.isSaving$.next(false)))
      .subscribe({
        next: () => this.close(),
        error: (err) => alert(err),
      });
  }

  close() {
    this.marker.getPopup().remove();
  }
}
