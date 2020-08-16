import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  @Input() user: User;
  @Input() mode: string = 'add';

  public userForm: FormGroup;
  public datePickerDate: NgbDate;

  constructor(public _activeModal: NgbActiveModal,
              private _userService: UserService,
              private _toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.userForm = new FormGroup ({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      emailAddress: new FormControl(this.user.emailAddress),
      contactNumber: new FormControl(this.user.contactNumber),
      managerEmail: new FormControl(this.user.managerEmail),
      jobTitle: new FormControl(this.user.jobTitle)      
    });

    let startDateAsMoment = moment(this.user.startDate);
    
    this.datePickerDate = new NgbDate(startDateAsMoment.year(), startDateAsMoment.month()+1, startDateAsMoment.date());
  }

  onUserFormSubmit(): void{    

    let updateUser: User = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      emailAddress: this.userForm.value.emailAddress,
      contactNumber: this.userForm.value.contactNumber,
      managerEmail: this.userForm.value.managerEmail,
      jobTitle: this.userForm.value.jobTitle,
      startDate: moment(`${this.datePickerDate.year}-${this.datePickerDate.month}-${this.datePickerDate.day}`).toDate()
    }
    
    if(this.mode == 'add'){
      this._userService.createUser(updateUser).then(res => {
        this._toastr.success('', 'User created');
        this._activeModal.close(updateUser);
      });
    }

    if(this.mode == 'edit'){
      this._userService.editUser(updateUser).then(res => {
        this._toastr.success('', 'User updated');
        this._activeModal.close(updateUser);
      });
    }

  }
  
  public cancel(): void{
    this._activeModal.close(null);
  }

}
