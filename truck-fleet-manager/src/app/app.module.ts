import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppLoginModule } from 'projects/app-login/src';
import { CommonUiModule } from 'projects/common-ui/src';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonUiModule,
    AppLoginModule,
    MatDialogModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
