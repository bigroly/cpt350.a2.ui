import { LeaveRequest } from '../requests/leave.request.model';
import { Approval } from './../requests/approval.model';
export interface ApprovalCombinedUI {
  guid: string;
  approval: Approval;
  requestInfo: LeaveRequest;
}