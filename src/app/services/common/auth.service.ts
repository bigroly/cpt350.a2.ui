import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'aws-amplify';
import { Login } from 'src/app/model/auth/login.model';
import { AwsAuthError } from 'src/app/model/aws/aws.auth.error.model';
import { UserAuth } from 'src/app/model/auth/user.auth.model';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authDetails: UserAuth = null;

  private navLinks = [
    {
      route : '/dashboard',
      text : 'Dashboard',
      requiredPermissions: null
    },
    {
      route: '/users/list',
      text: 'Users',
      requiredPermissions: ['Admins']
    },
    {
      route: '/requests',
      text: 'My Requests',
      requiredPermissions: null
    }
  ];

  public accessibleLinks: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);

  constructor(private _toastr:ToastrService,
              private _router:Router) { 
    if(localStorage.getItem('authDetails')){
      this.authDetails = JSON.parse(localStorage.getItem('authDetails'));
      this.buildNavLinks();
    }
  }

  public tryLogin(model: Login){
    Auth.signIn(model.email, model.password).then(res => {          
      
      let newAuth: UserAuth = {
        email: res.attributes.email,
        jwtToken: res.signInUserSession.accessToken.jwtToken,
        tokenExpiry: res.signInUserSession.accessToken.payload.exp,
        permissionGroups: res.signInUserSession.accessToken.payload["cognito:groups"] ?? []
      }

      this.authDetails = newAuth;
      localStorage.setItem('authDetails', JSON.stringify(this.authDetails));     
      this.buildNavLinks();
      this._router.navigateByUrl('/dashboard');
    }).catch(err => {
      let returnedErr: AwsAuthError = err;
      this._toastr.error(returnedErr.message, 'Error logging in');
    });
  }

  private buildNavLinks(): void{
    let newLinks = [];
      this.navLinks.forEach(n => {
        if(this.shouldRender(n.requiredPermissions)){
          newLinks.push(n);
        };
      });
      this.accessibleLinks.next(newLinks);
  }

  public logOut(){
    this.authDetails = null;
    localStorage.removeItem('authDetails');
    this._toastr.success('', 'Logged out.');
    this._router.navigateByUrl('/login');
    this.accessibleLinks.next([]);
  }

  public shouldRender(applicableGroups: string[]):boolean{

    if(applicableGroups == null) {
      return true;
    }

    for(let group of applicableGroups){
      if(this.authDetails.permissionGroups.find(p => p == group) != null){
        return true;
      }
    }

    return false;
  }

}