import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BateaComponent } from './components/batea-component/batea.component';
import { adminGuard } from '../../../projects/guards/admin.guard';

const routes: Routes = [
  { path: '', component: BateaComponent,canActivate: [adminGuard] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BateaRoutingModule { }
