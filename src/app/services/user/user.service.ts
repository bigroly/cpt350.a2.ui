import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Auth } from 'aws-amplify';
import { BaseService } from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

import { GetAllUsersResponse } from '../../model/user/get.all.users.response.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private apiUrl: string = `${environment.apiUrl}/api/users`;

  constructor(
    public _httpClient: HttpClient, 
    public _authService: AuthService,
    private _toastr: ToastrService) { 
    super(_httpClient, _authService);
  }

  public getAllUsers(): Promise<GetAllUsersResponse>{
    return new Promise(resolve => {

			let endpoint = `${this.apiUrl}`;
			this._httpClient.get<GetAllUsersResponse>(endpoint, { headers: this.generateHeader() }).toPromise().then(res => {
        if(res.success){
          resolve(res);
        }else{
          this._toastr.error(res.errorMessage, 'Error getting Users');
        }
			}, err => {
				//this._loaderService.amendLoadCount(-1);
        //this._toastr.error('','Error searching for unit');
        this._toastr.error('','Error getting Users');
			}).catch(err => {
				//this._loaderService.amendLoadCount(-1);
        //this._toastr.error('','Error searching for unit');
        this._toastr.error('','Error getting Users');
			});
		});
  }

  public createUser(){
    
  }

}
