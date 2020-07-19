import { Component, OnInit } from '@angular/core';
import { Login } from '../../../model/auth/login.model';


import { ToastrService } from 'ngx-toastr';

import { AwsAuthError } from '../../../model/aws/aws.auth.error.model';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModel: Login = {
    email : "",
    password : ""
  };

  constructor(private _toastr:ToastrService, private _authService: AuthService) { 
  }

  ngOnInit(): void {
  }

  public onLoginFormSubmit(){
    this._authService.tryLogin(this.loginModel);
  }

}
