import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { environment } from '../environments/environment';

//angular calendar
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
/* import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime'; */


//social 
/* import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login'; */




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChooseFestivalComponent } from './choose-festival/choose-festival.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { FestivalSettingsComponent } from './festival-settings/festival-settings.component';
import { BandsInFestComponent } from './bands-in-fest/bands-in-fest.component';
import { NewBandsFestComponent } from './new-bands-fest/new-bands-fest.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChooseFestivalComponent,
    ChooseArtistComponent,
    UserComponent,
    HomeComponent,
    FestivalSettingsComponent,
    BandsInFestComponent,
    NewBandsFestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    SweetAlert2Module,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    DragDropModule,
    /* SocialLoginModule, */
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    FlatpickrModule.forRoot(),
    MatSelectModule, /* OwlDateTimeModule, OwlNativeDateTimeModule, */
    FlatpickrModule.forRoot(),


  ],
  providers: [
    /*  {
       provide: 'SocialAuthServiceConfig',
       useValue: {
         autoLogin: false,
         providers: [
           {
             id: GoogleLoginProvider.PROVIDER_ID,
             provider: new GoogleLoginProvider("263444646341-92tjdmtkic4ir64kt4tb9e69g09m79k4.apps.googleusercontent.com"),
           },
         ],
       } as SocialAuthServiceConfig,
     } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }