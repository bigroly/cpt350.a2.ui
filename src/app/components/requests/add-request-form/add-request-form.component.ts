import { ApprovalService } from './../../../services/approval/approval.service';
import { Approval } from './../../../model/requests/approval.model';
import { PostFileRequest } from './../../../model/files/post.file.request.model';
import { FileService } from './../../../services/file/file.service';
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

  public attachment: File = null;
  public fileUploadReq: PostFileRequest = null;

  public requestForm: FormGroup;
  public leaveTypes: string[] = [
    "Annual Leave",
    "Personal Leave"
  ]
  public requestorEmail: string = '';
  public approverEmail: string = '';

  public ngbStartDate: NgbDate;
  public ngbEndDate: NgbDate;

  public leaveDuration: number;

  constructor(public _activeModal: NgbActiveModal,
              private _leaveReqService: LeaveRequestsService,
              private _approvalService: ApprovalService,
              private _fileService: FileService,
              private _toastr: ToastrService) { 

    this.requestForm = new FormGroup ({
      requestGuid: new FormControl(guid()),
      leaveType: new FormControl(''),
      note: new FormControl('')
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
      leaveType: 'Annual Leave'
    });    

    this.requestorEmail = this.requestorProfile.emailAddress;
    this.approverEmail = this.requestorProfile.managerEmail;
  }

  onRequestFormSubmit(): void{

    let leaveRequest: LeaveRequest = {
      requestGuid: this.requestForm.value.requestGuid,
      requestor: this.requestorEmail,
      approver: this.approverEmail,
      leaveType: this.requestForm.value.leaveType,
      startDate: moment(`${this.ngbStartDate.year}-${this.ngbStartDate.month}-${this.ngbStartDate.day+1}`).toDate(),
      endDate: moment(`${this.ngbEndDate.year}-${this.ngbEndDate.month}-${this.ngbEndDate.day+1}`).toDate(),
      note: this.requestForm.value.note,
      docLink: ''
    }

    if(this.fileUploadReq != null){
      this._fileService.postFile(this.fileUploadReq).then(uploadComplete => {
        leaveRequest.docLink = this.fileUploadReq.fileKey;
        this.submitLeaveRequestAndApproval(leaveRequest);
      });
    }else{
      this.submitLeaveRequestAndApproval(leaveRequest);
    }
  }

  private submitLeaveRequestAndApproval(req: LeaveRequest){
    this._leaveReqService.addRequest(req).then(response => {
      let approval: Approval = {
        approver: req.approver,
        requestor: req.requestor,
        requestGuid: req.requestGuid,
        status: 'Pending Approval',
        approved: false
      }     
      this._approvalService.addUpdateApproval(approval).then(a => {
        this._toastr.success('', 'Request Submitted');
        this._activeModal.close('added');
      });     
    });
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

  public onFileInputChange(event: any){

    let fileList = event.target.files;

    if(fileList.length > 0){
      this.attachment = fileList[0];
      if(this.attachment.type == 'application/pdf'){
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          let fileContent = fileReader.result.toString();
          let base64string = fileContent.substr(fileContent.indexOf(',') + 1);
          this.fileUploadReq = {
            fileKey: `${guid()}.pdf`,
            fileBase64: base64string
          }         
        }
        fileReader.readAsDataURL(fileList[0]);
      }
    }
  }

}
