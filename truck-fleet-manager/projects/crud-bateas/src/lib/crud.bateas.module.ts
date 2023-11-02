import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    HttpClientModule,
    MatSnackBarModule,
    CommonUiModule
  ]
})
export class CrudBateasModule { }
