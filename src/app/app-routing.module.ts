import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChooseFestivalComponent } from './choose-festival/choose-festival.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';


const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { path: "choose-fest", component: ChooseFestivalComponent },
  { path: "choose-artist", component: ChooseArtistComponent },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
