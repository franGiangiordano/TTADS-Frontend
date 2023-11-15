import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'projects/common/src/guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('../../projects/app-login/src').then(x => x.AppLoginModule) },
  { path: 'dashboard', loadChildren: () => import('../../projects/dashboard/dashboard.module').then(x => x.DashboardModule), canActivate: [authGuard] },
  { path: 'bateas', loadChildren: () => import('../../projects/crud-bateas/src').then(x => x.CrudBateasModule), canActivate: [authGuard] },
  { path: 'drivers', loadChildren: () => import('../../projects/crud-drivers/src').then(x => x.CrudDriversModule), canActivate: [authGuard] },
  { path: 'trailers', loadChildren: () => import('../../projects/crud-trailers/src').then(x => x.CrudTrailersModule), canActivate: [authGuard] },
  { path: 'equipments', loadChildren: () => import('../../projects/crud-equipment/src').then(x => x.CrudEquipmentModule), canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }