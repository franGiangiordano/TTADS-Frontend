import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { CommonUiModule } from 'projects/common-ui/src';

import { CrudTrailersRoutingModule } from './crud.trailers.routing.module';
import { TrailerListComponent } from './components/trailer.list/trailer.list.component';
import { TrailerFormComponent } from './components/trailer.form/trailer.form.component';
import { TrailerComponent } from './components/trailer/trailer.component';


@NgModule({
  declarations: [
    TrailerListComponent,
    TrailerFormComponent,
    TrailerComponent
  ],
  imports: [
    CommonModule,
    CrudTrailersRoutingModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class CrudTrailersModule { }
