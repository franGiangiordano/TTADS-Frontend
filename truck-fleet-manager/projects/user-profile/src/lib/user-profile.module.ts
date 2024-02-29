import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from 'projects/common-ui/src';
import { UserProfileRoutingModule } from './user.profile.routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { UserProfileComponent } from './components/user-profile.component';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    UserProfileRoutingModule,
    CommonModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
