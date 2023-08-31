import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomeComponent } from 'projects/app-login/src';

const routes: Routes = [
  { path: 'login', component: LoginHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
