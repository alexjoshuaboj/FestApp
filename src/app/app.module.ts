import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChooseFestivalComponent } from './choose-festival/choose-festival.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';
import { ChatComponent } from './chat/chat.component';
import { AlgoritmHoursComponent } from './algoritm-hours/algoritm-hours.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChooseFestivalComponent,
    ChooseArtistComponent,
    ChatComponent,
    AlgoritmHoursComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }