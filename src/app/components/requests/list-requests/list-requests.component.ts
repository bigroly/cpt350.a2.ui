import { AddRequestFormComponent } from './../add-request-form/add-request-form.component';
import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from '../../../model/requests/leave.request.model';
import { LeaveRequestsService } from '../../../services/leave-requests/leave-requests.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { v4 as uuid } from 'uuid';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user/user.model';
import * as moment from 'moment';
import { ApprovalCombinedUI } from 'src/app/model/approvals/approval.combined.ui.model';
import { Approval } from 'src/app/model/requests/approval.model';
import { ApprovalService } from 'src/app/services/approval/approval.service';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss']
})
export class ListRequestsComponent implements OnInit {

  public requests: LeaveRequest[] = [];
  public myProfile: User = null;

  public totalALEarnt: number = 0;
  public totalALUsed: number = 0;
  public totalALAvailable: number = 0;

  public totalPLEarnt: number = 0;
  public totalPLUsed: number = 0;
  public totalPLAvailable: number = 0;

  public requestsCombinedUI: ApprovalCombinedUI[] = [];

  constructor(
    private _requestsService: LeaveRequestsService,
    private _authService: AuthService,
    private _userService: UserService,
    private _approvalService: ApprovalService,
    private _modalService: NgbModal) { 
      this.init();
  }

  ngOnInit(): void {
    
  }

  public init(){
    this._requestsService.getMyRequests(this._authService.authDetails.email).then(r => {
      this.requests = r.requests;
      this._userService.getUser(this._authService.authDetails.email).then(response => {
        this.myProfile = response.user;

        for(let req of this.requests){
          this._approvalService.getApprovalsForUser(req.approver).then(a => {
            this.requestsCombinedUI.push({
              guid: req.requestGuid,
              approval: a.approvals.find(apv => apv.requestGuid == req.requestGuid),
              requestInfo: req
            });
          })
        }

        this.calculateLeave();
      });
    });
  }

  private calculateLeave(): void{

    for(let request of this.requestsCombinedUI){
      if(request.approval.status != 'Rejected'){
        let requestStart = moment(request.requestInfo.startDate);
        let requestEnd = moment(request.requestInfo.endDate);      
        let requestHoursUsed = moment.duration(requestEnd.diff(requestStart)).asDays() + 1;
        
        if(request.requestInfo.leaveType == 'Annual Leave'){        
          this.totalALUsed +=  requestHoursUsed * 7.6 ;
        }
        else{
          this.totalPLUsed += requestHoursUsed * 7.6
        }     
      }     
    };
    
    let empStartDate = moment(this.myProfile.startDate);
    let today = moment();
    
    this.totalALEarnt = ( moment.duration(today.diff(empStartDate)).asDays() ) * 0.416438356;
    this.totalPLEarnt = ( moment.duration(today.diff(empStartDate)).asDays() ) * 0.208219178;

    this.totalALAvailable = this.totalALEarnt - this.totalALUsed;
    this.totalPLAvailable = this.totalPLEarnt - this.totalPLUsed;
  }

  public onCreateRequestClick(): void{

    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false,
          size: 'lg'
    };    

    const modalRef = this._modalService.open(AddRequestFormComponent, ngbModalOptions);
    modalRef.componentInstance.mode = 'add';
    modalRef.componentInstance.request = null;
    modalRef.componentInstance.alAvailable = this.totalALAvailable;
    modalRef.componentInstance.plAvailable = this.totalPLAvailable;
    modalRef.componentInstance.requestorProfile = this.myProfile;

    modalRef.result.then(newRequest => {
      if(newRequest != null){
        this.init();
      }
    }).catch(err => {});
  }

}
 