import { LeaveRequestsService } from './../../../services/leave-requests/leave-requests.service';
import { Component, OnInit, Input } from '@angular/core';
import { LeaveRequest } from 'src/app/model/requests/leave.request.model';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbDate, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user/user.model';
import { AuthService } from 'src/app/services/common/auth.service';

import {v4 as guid } from 'uuid';
import * as moment from 'moment';
import { input } from 'aws-amplify';

@Component({
  selector: 'app-add-request-form',
  templateUrl: './add-request-form.component.html',
  styleUrls: ['./add-request-form.component.scss']
})
export class AddRequestFormComponent implements OnInit {

  @Input() mode: string;
  @Input() request: LeaveRequest;  
  @Input() alAvailable: number;
  @Input() plAvailable: number;
  @Input() requestorProfile: User;

  public requestForm: FormGroup;
  public leaveTypes: string[] = [
    "Annual Leave",
    "Personal Leave"
  ]

  public ngbStartDate: NgbDate;
  public ngbEndDate: NgbDate;

  public leaveDuration: number;

  constructor(public _activeModal: NgbActiveModal,
              private _leaveReqService: LeaveRequestsService,
              private _userService: UserService,
              private _authService: AuthService,
              private _toastr: ToastrService) { 

    this.requestForm = new FormGroup ({
      approver : new FormControl({value : '', disabled: true}),
      requestor: new FormControl({value : '', disabled: true}),
      requestGuid: new FormControl(guid()),
      leaveType: new FormControl(''),
      notes: new FormControl('')
    });

    let now = moment();
    this.ngbStartDate = new NgbDate(now.year(), now.month()+1, now.date());
    this.ngbEndDate = new NgbDate(now.year(), now.month()+1, now.date());      
    this.leaveDuration = 7.6;  
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.requestForm.patchValue({
      approver: this.requestorProfile.managerEmail,
      requestor: this.requestorProfile.emailAddress
    });    
  }

  onRequestFormSubmit(): void{

  }

  public onStartDateSelect(date: NgbDate): void{
    this.leaveDuration = this.calculateLeaveRequestedInHours(date, this.ngbEndDate);
  }

  public onEndDateSelect(date: NgbDate): void{
    this.leaveDuration = this.calculateLeaveRequestedInHours(this.ngbStartDate, date);
  }

  private validateDateRange(s: NgbDate, e: NgbDate): boolean{
    let start = moment(`${s.year}-${s.month}-${s.day}`);
    let end = moment(`${e.year}-${e.month}-${e.day}`);

    if(end.isBefore(start)){
      return false;
    }    

    return true;
  }

  private calculateLeaveRequestedInHours(s: NgbDate, e:NgbDate): number{
    let start = moment(`${s.year}-${s.month}-${s.day}`);
    let end = moment(`${e.year}-${e.month}-${e.day}`);
    let requestDaysDuration = moment.duration(end.diff(start)).asDays() + 1;
    return requestDaysDuration * 7.6
  }

  public cancel(): void{
    this._activeModal.close(null);
  }

}
