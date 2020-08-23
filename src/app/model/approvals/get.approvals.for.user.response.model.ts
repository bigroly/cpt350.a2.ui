import { Approval } from './../requests/approval.model';
import { BaseResponse } from './../base.response.model';

export interface GetApprovalsForUserResponse extends BaseResponse {
  approvals: Approval[];
}