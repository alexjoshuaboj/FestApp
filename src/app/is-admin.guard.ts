import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  token: any;
  tokenRole: any;
  constructor(private router: Router) {
    this.token = localStorage.getItem('token_user');
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.tokenRole = this.getDecodedAccessToken(this.token).role;
    if (this.tokenRole === 'ADMIN') {
      return true
    } else {
      this.router.navigate(['/home']);
      return false
    }
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

}
