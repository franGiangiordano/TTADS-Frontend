import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BateaComponent } from './components/batea-component/batea.component';

const routes: Routes = [
  { path: '', component: BateaComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BateaRoutingModule { }
