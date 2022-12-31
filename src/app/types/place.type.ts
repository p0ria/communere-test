import { PlaceType } from './place-type';

export interface Place {
  id?: number;
  name: string;
  lng: number;
  lat: number;
  type: PlaceType;
  description?: string;
  logo?: string;
}
