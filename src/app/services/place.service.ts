import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, Observable } from 'rxjs';
import { Place } from '../types/place.type';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  places$ = new BehaviorSubject<Place[]>([]);
  isLoading$ = new BehaviorSubject(true);

  constructor(private dbService: DbService) {
    this.loadPlaces();
  }

  addPlace(model: Place): Observable<Place> {
    return this.isLoading$.pipe(
      filter((isLoading) => !isLoading),
      delay(1000),
      map(() => {
        const place = { ...model, id: this.places$.value.length + 1 };
        this.places$.next([...this.places$.value, model]);
        this.syncDb();
        return place;
      })
    );
  }

  editPlace(place: Place): Observable<Place> {
    return new Observable<Place>((observer) => {
      try {
        this.places$.next(
          this.places$.value.map((p) => (p.id === place.id ? place : p))
        );
        this.syncDb();
        observer.next(place);
      } catch (err) {
        observer.next(err);
      } finally {
        observer.complete();
      }
    }).pipe(delay(1000));
  }

  private loadPlaces() {
    this.isLoading$.next(true);
    this.places$.next(this.dbService.places);
    this.isLoading$.next(false);
  }

  private syncDb() {
    this.dbService.places = this.places$.value;
  }
}
