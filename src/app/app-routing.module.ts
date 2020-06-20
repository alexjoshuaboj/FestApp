import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChooseFestivalComponent } from './choose-festival/choose-festival.component';
import { ChooseArtistComponent } from './choose-artist/choose-artist.component';
import { LoginGuardGuard } from './login-guard.guard';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { path: "users", component: UserComponent },
  { path: "choose-fest", component: ChooseFestivalComponent, canActivate: [LoginGuardGuard] },
  { path: "choose-artist", component: ChooseArtistComponent, canActivate: [LoginGuardGuard] },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
