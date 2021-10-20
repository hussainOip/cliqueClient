import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (JSON.parse(localStorage.getItem('socialUserDetails')) != null) {
      if (this.jwtHelper.isTokenExpired(JSON.parse(localStorage.getItem('socialUserDetails')).token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    } else if (JSON.parse(localStorage.getItem('socialUserDetails')) == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}