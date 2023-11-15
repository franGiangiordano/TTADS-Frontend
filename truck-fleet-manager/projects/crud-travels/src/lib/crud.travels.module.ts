import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CommonUiModule } from 'projects/common-ui/src';

import { CrudTravelsRoutingModule } from './crud.travels.routing.module';
import { TravelFormComponent } from './components/travel.form/travel.form.component';
import { TravelListComponent } from './components/travel.list/travel.list.component';

@NgModule({
  declarations: [
    TravelFormComponent,
    TravelListComponent
  ],
  imports: [
    CrudTravelsRoutingModule,
    CommonModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class CrudTravelsModule { }
