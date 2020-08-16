import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from '../../../model/requests/leave.request.model';
import { LeaveRequestsService } from '../../../services/leave-requests/leave-requests.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss']
})
export class ListRequestsComponent implements OnInit {

  public requests: LeaveRequest[] = [];

  constructor(private _requestsService: LeaveRequestsService,
              private _authService: AuthService,
              private _modalService: NgbModal
              ) { }

  ngOnInit(): void {
    
  }

  public onCreateRequestClick(): void{

  }

}
 