import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { managerGuard } from 'projects/common/src';

import { TrailerComponent } from './components/trailer/trailer.component';
import { TrailerListComponent } from './components/trailer.list/trailer.list.component';
import {TrailerFormComponent} from './components/trailer.form/trailer.form.component';

const routes: Routes = [
  {
    path: '',
    component: TrailerComponent,
    children: [
      {
        path: '',
        component: TrailerListComponent,
      },
      {
        path: 'add',
        component: TrailerFormComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'edit/:id',
        component: TrailerFormComponent,
        canActivate: [managerGuard],
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudTrailersRoutingModule { }
