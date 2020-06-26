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

//fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

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
import { ChatBotComponent } from './chat-bot/chat-bot.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChooseFestivalComponent,
    ChooseArtistComponent,
    UserComponent,
    HomeComponent,
    ChatBotComponent
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
    FullCalendarModule, // register FullCalendar with you app
    FontAwesomeModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

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