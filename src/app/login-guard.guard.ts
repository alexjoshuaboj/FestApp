import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { FestService } from './fest.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  token: any;
  result: boolean;
  constructor(private festService: FestService, private router: Router) {

    this.result = false;
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    this.token = localStorage.getItem('token_user')
    console.log(this.token);
    this.result = await this.festService.getValidatorToken(this.token);
    console.log('Cacas', this.result);

    if (this.result === true) {
      return this.result;
    } else {
      this.router.navigate(['/login']);
      return false
    }

    /* .then(result => {
      if (result === true) {
        return true;
      }
    })
    .catch(err => {
      if (err) {

        return false;
      }
    }); */


  };

}
