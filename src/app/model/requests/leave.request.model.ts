export interface LeaveRequest {
  requestor: string;
  approver: string;
  requestGuid: string;
  startDate: Date;
  endDate: Date;
  leaveType: string;
  note: string;
  docLink: string;
}