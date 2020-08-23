import { GetApprovalsForUserResponse } from './../../model/approvals/get.approvals.for.user.response.model';
import { AddUpdateApprovalResponse } from './../../model/approvals/add.update.approvals.response.model';
import { Approval } from './../../model/requests/approval.model';
import { BaseService } from './../common/base.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../common/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService extends BaseService {

  private apiUrl: string = `${environment.apiUrl}/api/approvals`;
  
  constructor(
    public _httpClient: HttpClient, 
    public _authService: AuthService,
    private _toastr: ToastrService) { 
      super(_httpClient, _authService);
  }
  
  public addUpdateApproval(request: Approval): Promise<AddUpdateApprovalResponse>{
    return new Promise(resolve => {
      this._httpClient.post<AddUpdateApprovalResponse>(this.apiUrl, request, { headers: this.generateHeader() }).toPromise().then(res => {
        if(res.success){
          resolve(res);
        }else{
          this._toastr.error(res.errorMessage, 'Error creating approval');
        }
      });
    })
  }

  public getApprovalsForUser(userEmail: string): Promise<GetApprovalsForUserResponse>{
    return new Promise(resolve => {
      this._httpClient.get<GetApprovalsForUserResponse>(`${this.apiUrl}?userEmail=${userEmail}`, { headers: this.generateHeader() }).toPromise().then(res => {
        if(res.success){
          resolve(res);
        }else{
          this._toastr.error(res.errorMessage, 'Error getting Users');
        }
			});
    });
  }

}
