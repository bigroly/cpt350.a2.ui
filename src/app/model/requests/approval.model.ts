export interface Approval {
  approver: string;
  requestor: string;
  requestGuid: string;
  status: string;
  approved: boolean;
}