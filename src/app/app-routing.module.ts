import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChooseFestivalComponent } from './choose-festival/choose-festival.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';
import { LoginGuardGuard } from './login-guard.guard';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { FestivalSettingsComponent } from './festival-settings/festival-settings.component';
import { IsAdminGuard } from './is-admin.guard';
import { NewBandsFestComponent } from './new-bands-fest/new-bands-fest.component';


const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { path: "users", component: UserComponent },
  { path: "home", component: HomeComponent },
  { path: "festivalsettings", component: FestivalSettingsComponent, canActivate: [LoginGuardGuard, IsAdminGuard] },
  { path: 'addArtist', component: NewBandsFestComponent, canActivate: [LoginGuardGuard, IsAdminGuard] },
  { path: "choose-fest", component: ChooseFestivalComponent, canActivate: [LoginGuardGuard] },
  { path: "choose-artist", component: ChooseArtistComponent, canActivate: [LoginGuardGuard] },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

