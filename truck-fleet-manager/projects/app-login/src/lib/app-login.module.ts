import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { LoginHomeComponent } from './login-home/login-home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LoginHomeComponent,
    LoginFormComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [
    LoginHomeComponent,
    LoginFormComponent
  ]
})
export class AppLoginModule { }
