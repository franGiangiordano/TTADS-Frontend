import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CommonUiModule } from 'projects/common-ui/src';

import { CrudRepairsRoutingModule } from './crud.repairs.routing.module';
import { RepairFormComponent } from './components/repair.form/repair.form.component';
import { RepairlistComponent } from './components/repair.list/repair.list.component';

@NgModule({
  declarations: [
    RepairFormComponent,
    RepairlistComponent,
  ],
  imports: [
    CrudRepairsRoutingModule,
    CommonModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class CrudRepairsModule { }

