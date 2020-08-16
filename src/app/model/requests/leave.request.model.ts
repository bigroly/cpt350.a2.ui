export interface LeaveRequest {
  requestor: string;
  approver: string;
  requestGuid: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  docLink: string;
}