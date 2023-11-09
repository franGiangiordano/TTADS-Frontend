import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard } from 'projects/common/src';

import { TrailerComponent } from './components/trailer/trailer.component';
import { TrailerListComponent } from './components/trailer.list/trailer.list.component';
import {TrailerFormComponent} from './components/trailer.form/trailer.form.component';

const routes: Routes = [
  {
    path: '',
    component: TrailerComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: TrailerListComponent,
      },
      {
        path: 'add',
        component: TrailerFormComponent,
      },
      {
        path: 'edit/:id',
        component: TrailerFormComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudTrailersRoutingModule { }
