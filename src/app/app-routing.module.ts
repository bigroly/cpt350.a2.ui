import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';

import { AuthguardService as AuthGuard, AuthguardService } from './services/common/authguard.service';
import { UserListComponent } from './components/user/user-list/user-list.component';

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
