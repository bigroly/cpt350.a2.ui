import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'aws-amplify';
import { Login } from 'src/app/model/auth/login.model';
import { AwsAuthError } from 'src/app/model/aws/aws.auth.error.model';
import { UserAuth } from 'src/app/model/auth/user.auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authDetails: UserAuth = null;

  constructor(private _toastr:ToastrService,
              private _router:Router) { 
    if(localStorage.getItem('authDetails')){
      this.authDetails = JSON.parse(localStorage.getItem('authDetails'));
    }
  }

  public tryLogin(model: Login){
    Auth.signIn(model.email, model.password).then(res => {          
      
      let newAuth: UserAuth = {
        email: res.attributes.email,
        jwtToken: res.signInUserSession.accessToken.jwtToken,
        tokenExpiry: res.signInUserSession.accessToken.payload.exp,
        permissionGroups: res.signInUserSession.accessToken.payload["cognito:groups"]
      }

      this.authDetails = newAuth;
      localStorage.setItem('authDetails', JSON.stringify(this.authDetails));

      this._router.navigateByUrl('/dashboard');
    }).catch(err => {
      let returnedErr: AwsAuthError = err;
      this._toastr.error(returnedErr.message, 'Error logging in');
    });
  }

  public logOut(){
    this.authDetails = null;
    localStorage.removeItem('authDetails');
    this._toastr.success('', 'Logged out.');
    this._router.navigateByUrl('/login');
  }

}