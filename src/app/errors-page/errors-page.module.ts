import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorsPageRoutes } from './errors-page.routing';
import { MatTableModule } from '@angular/material/table';
import { ErrorsPageComponent } from './component/errors-page/errors-page.component';



@NgModule({
  declarations: [
    ErrorsPageComponent
  ],
  imports: [
    MatTableModule,
    RouterModule.forChild(ErrorsPageRoutes),
    CommonModule
  ]
})
export class ErrorsPageModule { }
