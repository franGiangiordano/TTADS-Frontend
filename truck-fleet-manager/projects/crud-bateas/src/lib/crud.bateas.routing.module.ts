import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard } from 'projects/common/src';

import { BateaListComponent } from './components/batea-list-component/batea.list.component';

const routes: Routes = [
  { path: '', component: BateaListComponent, canActivate: [adminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudBateasRoutingModule { }
