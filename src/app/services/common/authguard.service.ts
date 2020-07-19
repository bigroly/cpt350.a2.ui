import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';
import { UserAuth } from 'src/app/model/auth/user.auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private _router: Router, private _authService: AuthService, private _toastr: ToastrService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let token = this._authService.authDetails;

    let epochUtcNow: number = + moment().format('X');
    
    if(!token){      
      this._toastr.error( 'You have not yet signed in, please sign in to continue.' , 'Permissions error');
      //this._authService.redirectRoute = state.url;
      this._router.navigate(['/login']);      
      return false;
    }
    
    if (!token.tokenExpiry) {      
      this._toastr.error( 'Your access token is invalid, please sign in again.' , 'Permissions error');
      this._router.navigate(['/login']);      
      //this._authService.redirectRoute = state.url;      
      return false;
    }
    
    //token expired - refresh then return true if logged in selected
    if(token.tokenExpiry < epochUtcNow){
      this._toastr.error( 'Your access token has expired, please sign in again.' , 'Permissions error');
        //this._authService.redirectRoute = state.url;
        this._router.navigate(['/login']);      
        return false;     
    }
    
    if(this.checkUserPermissionsForRoute(next, token)){
      return true;
    }
    else{
      this._toastr.warning('You do not have permissions to access that component. Please contact an admin to amend your permission settings', 'Access denied');
      return false;
    }
  }

  private checkUserPermissionsForRoute(routeTo: ActivatedRouteSnapshot, userPermissions: UserAuth): boolean{
    
    if(routeTo.data.allowedGroups == null){
      return true;
    }

    for(let group of routeTo.data.allowedGroups){
      if(userPermissions.permissionGroups.find(g => g.toLowerCase() == group.toLowerCase())){
        //user has permission for this component
        return true;
      }
    }

    return false;
  }
}
