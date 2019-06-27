import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private userService : UserService,private router : Router){}

  //canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //  console.log(this.userService.isLoggedIn());
  //  if (!this.userService.isLoggedIn()) {
  //      this.router.navigateByUrl('/login');
  //      this.userService.deleteToken();
  //      return false;
  //    }
  //  return true;
  //}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('username')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
