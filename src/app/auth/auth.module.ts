import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(AuthRoutes),
    CommonModule
  ]
})
export class AuthModule { }
