import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public modules = [
    {
      displayText: 'Lodge leave',
      route: '/leave/lodge',
      faIcon: 'fa-leave'
    }
  ]

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {

  }

}
