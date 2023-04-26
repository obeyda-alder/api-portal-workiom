import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectContentComponent } from './components/project-content.component';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from '@angular/router';
import { ProjectRoutes } from './project.routing';



@NgModule({
    declarations: [
        ProjectContentComponent
    ],
    imports: [
        RouterModule.forChild(ProjectRoutes),
        CommonModule,
        SharedModule
    ]
})
export class ProjectModule { }
