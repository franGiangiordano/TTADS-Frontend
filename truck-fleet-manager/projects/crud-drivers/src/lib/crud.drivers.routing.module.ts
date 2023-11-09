import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard } from 'projects/common/src';

import { DriverComponent } from './components/driver/driver.component';
import { DriverListComponent } from './components/driver.list/driver.list.component';
import {DriverFormComponent} from './components/driver.form/driver.form.component';

const routes: Routes = [
  {
    path: '',
    component: DriverComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: DriverListComponent,
      },
      {
        path: 'add',
        component: DriverFormComponent,
      },
      {
        path: 'edit/:id',
        component: DriverFormComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudDriversRoutingModule { }
