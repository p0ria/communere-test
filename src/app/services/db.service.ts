import { Injectable } from '@angular/core';
import { Place } from '../types/place.type';

const KEYS = {
  places: 'PLACES',
};

@Injectable({
  providedIn: 'root',
})
export class DbService {
  get places(): Place[] {
    return JSON.parse(localStorage.getItem(KEYS.places) || '[]');
  }

  set places(value: Place[]) {
    localStorage.setItem(KEYS.places, JSON.stringify(value || []));
  }
}
