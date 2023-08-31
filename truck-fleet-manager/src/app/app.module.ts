import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppLoginModule } from 'projects/app-login/src';
import { CommonUiModule } from 'projects/common-ui/src';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonUiModule,
    AppRoutingModule,
    AppLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
