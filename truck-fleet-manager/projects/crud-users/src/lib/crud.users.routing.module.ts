import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard } from 'projects/common/src';

import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user.list/user.list.component';
import { UserFormComponent } from './components/user.form/user.form.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'add',
        component: UserFormComponent,
      },
      {
        path: 'edit/:id',
        component: UserFormComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudUsersRoutingModule { }
