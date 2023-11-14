import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { managerGuard } from 'projects/common/src';

import { BateaComponent } from './components/batea-component/batea.component';
import { BateaListComponent } from './components/batea-list-component/batea.list.component';
import {BateaFormComponent} from './components/batea-form-component/batea.form.component';

const routes: Routes = [
  {
    path: '',
    component: BateaComponent,
    children: [
      {
        path: '',
        component: BateaListComponent,
      },
      {
        path: 'add',
        component: BateaFormComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'edit/:id',
        component: BateaFormComponent,
        canActivate: [managerGuard],
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudBateasRoutingModule { }
