import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];

  constructor(private _userService: UserService) { 
    this._userService.getAllUsers().then(u => {
      this.userList = u.users;
    });
  }

  ngOnInit(): void {

  }  

}
