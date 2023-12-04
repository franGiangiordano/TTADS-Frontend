import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepairFormComponent } from './components/repair.form/repair.form.component';
import { RepairlistComponent } from './components/repair.list/repair.list.component';

const routes: Routes = [
  {
    path: '',
    component: RepairlistComponent,    
  },
  {
    path: 'add',
    component: RepairFormComponent,
  },
  {
    path: 'edit/:id',
    component: RepairFormComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRepairsRoutingModule { }
