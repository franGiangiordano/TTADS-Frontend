import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CommonUiModule } from 'projects/common-ui/src';

import { EquipmentRoutingModule } from './crud.equipment.routing.module';
import { EquipmentComponent } from './components/equipment-component/equipment.component';
import { EquipmentFormComponent } from './components/equipment-form-component/equipment.form.component';
import { EquipmentListComponent } from './components/equipment-list-component/equipment.list.component';

@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentFormComponent,
    EquipmentListComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    CommonUiModule
  ]
})
export class CrudEquipmentModule { }
