import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../common/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestsService extends BaseService {

  constructor(
    public _httpClient: HttpClient, 
    public _authService: AuthService,
    private _toastr: ToastrService) { 
    super(_httpClient, _authService);
  }

  public getMyRequests(userName: string){
    
  }
  
}
