import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CommonUiModule } from 'projects/common-ui/src';

import { CrudDriversRoutingModule } from './crud.drivers.routing.module';
import { DriverListComponent } from './components/driver.list/driver.list.component';
import { DriverFormComponent } from './components/driver.form/driver.form.component';
import { DriverComponent } from './components/driver/driver.component';


@NgModule({
  declarations: [
    DriverListComponent,
    DriverFormComponent,
    DriverComponent
  ],
  imports: [
    CommonModule,
    CrudDriversRoutingModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class CrudDriversModule { }
