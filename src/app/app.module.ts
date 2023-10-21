import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeModule } from './prime/prime.module';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CardCompComponent } from './components/card-comp/card-comp.component';
import { HeadingComponent } from './components/heading/heading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInteService } from './config/error-inte.service';
import { PostofficeComponent } from './components/postoffice/postoffice.component';
import { JsonplaceComponent } from './components/jsonplace/jsonplace.component';
import { VideoCardComponent } from './components/video-card/video-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AboutComponent,
    HomeComponent,
    ErrorComponent,
    CardCompComponent,
    HeadingComponent,
    NavbarComponent,
    PostofficeComponent,
    JsonplaceComponent,
    VideoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimeModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:ErrorInteService,multi:true}],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
