import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { FestService } from './fest.service';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  token: any;
  tokenDes: any;
  dataCreated: Date;
  dataExpired: Date;
  constructor(private festService: FestService, private router: Router) {
    this.token = localStorage.getItem('token_user');
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    let time;
    if (this.token !== null) {
      this.tokenDes = this.getDecodedAccessToken(this.token);
      time = this.tokenDes.expireDATE - this.tokenDes.createDATE;
    } else {
      this.router.navigate(['/'])
    }




    if (time > 0) {
      return true;
    } else {

      return false;
    }


    /* this.token = localStorage.getItem('token_user')
    console.log(this.token);
    this.result = await this.festService.getValidatorToken(this.token);
    console.log('Cacas', this.result);

    if (this.result === true) {
      return this.result;
    } else {
      this.router.navigate(['/login']);
      return false
    } */

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

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

}
