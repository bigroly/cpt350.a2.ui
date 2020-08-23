import { BaseResponse } from '../base.response.model';
import { LeaveRequest } from './leave.request.model';

export interface GetLeaveRequestsResponse extends BaseResponse {
  requests: LeaveRequest[];
}