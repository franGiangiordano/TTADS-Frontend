import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('../../projects/app-login/src').then(x => x.AppLoginModule) },
  { path: 'bateas', loadChildren: () => import('../../projects/crud-bateas/src').then(x => x.CrudBateasModule) },
  { path: 'drivers', loadChildren: () => import('../../projects/crud-drivers/src').then(x => x.CrudDriversModule) },
  { path: 'trailers', loadChildren: () => import('../../projects/crud-trailers/src').then(x => x.CrudTrailersModule) },
  { path: 'equipments', loadChildren: () => import('../../projects/crud-equipment/src').then(x => x.CrudEquipmentModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }