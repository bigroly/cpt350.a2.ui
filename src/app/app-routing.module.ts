import { ListApprovalsComponent } from './components/approvals/list-approvals/list-approvals.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';

import { AuthguardService as AuthGuard, AuthguardService } from './services/common/authguard.service';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { ListRequestsComponent } from './components/requests/list-requests/list-requests.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,    
  },  
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'users',
    canActivate: [AuthGuard],    
    children: [
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: UserListComponent,
        data: {
          allowedGroups: [
            'Admins'
          ]
        }
      }
    ]
  },
  {
    path: 'requests',
    component: ListRequestsComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: 'approvals',
    component: ListApprovalsComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
