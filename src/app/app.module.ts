import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'
import { HttpClientModule  } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddEditUserComponent } from './components/user/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    AddEditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center'      
    })
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
