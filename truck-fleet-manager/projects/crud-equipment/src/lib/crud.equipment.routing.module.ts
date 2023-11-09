import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard } from 'projects/common/src';

import { EquipmentComponent } from './components/equipment-component/equipment.component';
import { EquipmentFormComponent } from './components/equipment-form-component/equipment.form.component';
import { EquipmentListComponent } from './components/equipment-list-component/equipment.list.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: EquipmentListComponent,
      },
      {
        path: 'add',
        component: EquipmentFormComponent,
      },
      {
        path: 'edit/:id',
        component: EquipmentFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
