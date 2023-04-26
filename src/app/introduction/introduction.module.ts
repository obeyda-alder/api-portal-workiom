import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './components/introduction.component';
import { RouterModule } from '@angular/router';
import { IntroductionRoutes } from './errors-page.routing';



@NgModule({
  declarations: [
    IntroductionComponent
  ],
  imports: [
    RouterModule.forChild(IntroductionRoutes),
    CommonModule
  ]
})
export class IntroductionModule { }
