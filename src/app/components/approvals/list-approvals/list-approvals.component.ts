import { ToastrService } from 'ngx-toastr';
import { FileService } from './../../../services/file/file.service';
import { ApprovalCombinedUI } from './../../../model/approvals/approval.combined.ui.model';
import { LeaveRequestsService } from './../../../services/leave-requests/leave-requests.service';
import { LeaveRequest } from 'src/app/model/requests/leave.request.model';
import { AuthService } from 'src/app/services/common/auth.service';
import { ApprovalService } from './../../../services/approval/approval.service';
import { Component, OnInit } from '@angular/core';
import { Approval } from 'src/app/model/requests/approval.model';

@Component({
  selector: 'app-list-approvals',
  templateUrl: './list-approvals.component.html',
  styleUrls: ['./list-approvals.component.scss']
})
export class ListApprovalsComponent implements OnInit {

  public approvals: Approval[] = [];
  public requestInfo: LeaveRequest[] = [];

  public approvalUIList: ApprovalCombinedUI[] = [];

  constructor(private _approvalService:ApprovalService,
              private _leaveRequestService: LeaveRequestsService,
              private _authService: AuthService,
              private _fileService: FileService,
              private _toastrService: ToastrService) {
    
    this._approvalService.getApprovalsForUser(this._authService.authDetails.email).then(r => {
      this.approvals = r.approvals;
      
      for(let _approval of this.approvals){
        this._leaveRequestService.getMyRequests(_approval.requestor).then(res => {
            this.approvalUIList.push({
              guid: _approval.requestGuid,
              approval: _approval,
              requestInfo: res.requests.find(rq => rq.requestGuid == _approval.requestGuid)
            });
        });
      }

    });
    
  }

  public onViewAttachmentClick(fileKey: string){
    console.log(fileKey);
    this._fileService.getFileByKey(fileKey).then(r => {
      window.open(r.fileUrl);
    });
  };

  ngOnInit(): void {
    
  }

  onUpdateApprovalClick(statusUpdate: string, approval: Approval){
    let aUpdate = approval;
    aUpdate.status = statusUpdate;
    this._approvalService.addUpdateApproval(aUpdate).then(complete => {
      this.approvalUIList.find(i => i.guid == approval.requestGuid).approval.status = statusUpdate;
      this._toastrService.success('', `Request ${statusUpdate}`);
    })
  }

}
