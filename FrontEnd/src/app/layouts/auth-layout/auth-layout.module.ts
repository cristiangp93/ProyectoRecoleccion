import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBP_oi2VSYvoa-KeAcjuTa2oxM9PT8c_AI'}),
  ],
  declarations: [
    LoginComponent,
    HomeComponent
  ]
})
export class AuthLayoutModule { }
