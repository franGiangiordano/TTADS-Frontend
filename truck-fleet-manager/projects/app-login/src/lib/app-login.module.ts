import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { NavService } from 'projects/common-ui/src/lib/nav/service/nav.service';

import { LoginHomeComponent } from './login-home/login-home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppLoginRoutingModule } from './app-login.routing.module';

@NgModule({
  declarations: [
    LoginHomeComponent,
    LoginFormComponent
  ],
  imports: [
    AppLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  providers: [
    NavService
  ],
  exports: [
    LoginHomeComponent,
    LoginFormComponent
  ]
})
export class AppLoginModule { }
