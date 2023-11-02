import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('app-login').then(x => x.AppLoginModule) },
  { path: 'bateas', loadChildren: () => import('crud-bateas').then(x => x.CRUDBateaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }