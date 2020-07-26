import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
