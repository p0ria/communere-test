import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ClarityIcons,
  uploadIcon,
  userIcon,
  windowCloseIcon,
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceFormComponent } from './components/place-form/place-form.component';
import { PlaceComponent } from './components/place/place.component';
import { PlacesComponent } from './components/places/places.component';
import { DIRECTIVES } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlaceComponent,
    PlaceFormComponent,
    ...DIRECTIVES,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(userIcon, windowCloseIcon, uploadIcon);
  }
}
