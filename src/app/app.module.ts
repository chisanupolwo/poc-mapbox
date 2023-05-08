import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMapboxGLModule } from "ngx-mapbox-gl";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Map
    NgxMapboxGLModule.withConfig({
      accessToken: "pk.eyJ1IjoibmVvbGlua2JwbyIsImEiOiJjbGd5aW5oNXEwYTBjM2xwZTdhaHdzbWQwIn0.T0xmhzggcTe7JGUX6Ffn2Q"
    }),
    NgxMapboxGLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
