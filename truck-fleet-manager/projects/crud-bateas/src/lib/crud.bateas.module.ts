import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CommonUiModule } from 'projects/common-ui/src';

import { CrudBateasRoutingModule } from './crud.bateas.routing.module';
import { BateaListComponent } from './components/batea-list-component/batea.list.component';

@NgModule({
  declarations: [
    BateaListComponent
  ],
  imports: [
    CommonModule,
    CrudBateasRoutingModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class CrudBateasModule { }
