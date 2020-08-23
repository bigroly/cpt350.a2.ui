import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from 'src/app/model/user/user.model';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import * as moment from 'moment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];

  constructor(private _userService: UserService,
              private _modalService: NgbModal) { 
    this._userService.getAllUsers().then(u => {
      this.userList = u.users;
    });
  }

  ngOnInit(): void {

  }  

  public onAddUserClick():void{
    let newUser: User = {
      emailAddress: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      managerEmail: '',
      startDate: new Date(),
      jobTitle: ''
    };

    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size: 'lg'
    };

    const modalRef = this._modalService.open(AddEditUserComponent, ngbModalOptions);
    modalRef.componentInstance.user = newUser;
    modalRef.componentInstance.mode = 'add';

    modalRef.result.then(addedUser => {
      if(addedUser != null){
        this.userList.push(addedUser);
      }
    }).catch(err => {});
    
  }

  public onEditUserClick(user: User){
    const modalRef = this._modalService.open(AddEditUserComponent, {size: 'lg'});
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.mode = 'edit';

    modalRef.result.then(editedUser => {
      if(editedUser != null){
        let existingUser = this.userList.find(u => u.emailAddress == editedUser.emailAddress);
        Object.assign(existingUser, editedUser);
      }
    }).catch(err => {});
  }  

}
