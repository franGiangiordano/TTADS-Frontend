import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CommonUiModule } from 'projects/common-ui/src';

import { CrudUsersRoutingModule } from './crud.users.routing.module';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user.form/user.form.component';
import { UserListComponent } from './components/user.list/user.list.component';


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    CrudUsersRoutingModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],  
})
export class CrudUserModule { }
