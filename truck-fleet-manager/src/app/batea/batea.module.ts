import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonUiModule } from '../../../projects/common-ui/src';
import { BateaRoutingModule } from './batea-routing.module';
import { BateaComponent } from './components/batea-component/batea.component';

@NgModule({
  declarations: [
    BateaComponent
  ],
  imports: [
    CommonModule,
    BateaRoutingModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSnackBarModule,
    CommonUiModule
  ]
})
export class BateaModule { }
