import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonUiModule } from '../../../projects/common-ui/src';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './components/driver-component/driver.component';



@NgModule({
  declarations: [
    DriverComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSnackBarModule,
    CommonUiModule
  ]
})
export class DriverModule { }
