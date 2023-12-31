import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { managerGuard } from 'projects/common/src';

import { EquipmentComponent } from './components/equipment-component/equipment.component';
import { EquipmentFormComponent } from './components/equipment-form-component/equipment.form.component';
import { EquipmentListComponent } from './components/equipment-list-component/equipment.list.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    children: [
      {
        path: '',
        component: EquipmentListComponent,
      },
      {
        path: 'add',
        component: EquipmentFormComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'edit/:id',
        component: EquipmentFormComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'travels',
        loadChildren: () => import('../../../crud-travels/src').then(x => x.CrudTravelsModule),
      },
      {
        path: 'repairs',
        loadChildren: () => import('../../../crud-repairs/src').then(x => x.CrudRepairsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
