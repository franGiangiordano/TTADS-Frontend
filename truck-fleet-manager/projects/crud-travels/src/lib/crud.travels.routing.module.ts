import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TravelListComponent } from './components/travel.list/travel.list.component';
import { TravelFormComponent } from './components/travel.form/travel.form.component';

const routes: Routes = [
  {
    path: '',
    component: TravelListComponent,    
  },
  {
    path: 'add',
    component: TravelFormComponent,
  },
  {
    path: 'edit/:id',
    component: TravelFormComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudTravelsRoutingModule { }
