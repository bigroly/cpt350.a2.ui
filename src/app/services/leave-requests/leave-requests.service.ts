import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../common/base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../common/auth.service';
import { ToastrService } from 'ngx-toastr';

import { GetLeaveRequestsResponse } from '../../model/requests/get.leave.requests.response.model';
import { AddUpdateLeaveRequestResponse } from '../../model/requests/add.update.leave.request.response.model';
import { LeaveRequest } from '../../model/requests/leave.request.model';


@Injectable({
  providedIn: 'root'
})
export class LeaveRequestsService extends BaseService {

  private apiUrl: string = `${environment.apiUrl}/api/leaveRequests`;

  constructor(
    public _httpClient: HttpClient, 
    public _authService: AuthService,
    private _toastr: ToastrService) { 
    super(_httpClient, _authService);
  }

  public getMyRequests(requestorEmail: string): Promise<GetLeaveRequestsResponse>{
    return new Promise(resolve => {
      this._httpClient.get<GetLeaveRequestsResponse>(`${this.apiUrl}?requestorEmail=${requestorEmail}`, { headers: this.generateHeader() }).toPromise().then(res => {
        if(res.success){
          resolve(res);
        }else{
          this._toastr.error(res.errorMessage, 'Error getting Users');
        }
			});
    });
  }

  public addRequest(request: LeaveRequest): Promise<AddUpdateLeaveRequestResponse>{
    return new Promise(resolve => {
      this._httpClient.post<AddUpdateLeaveRequestResponse>(this.apiUrl, request, { headers: this.generateHeader() }).toPromise().then(res => {
        if(res.success){
          resolve(res);
        }else{
          this._toastr.error(res.errorMessage, 'Error creating user');
        }
      });
    });
  }
  
}
