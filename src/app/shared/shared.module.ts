import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sideBarComponent } from './components/side-bar/side-bar.component';
import { CompilerTerminalComponent } from './components/compiler-terminal/compiler-terminal.component';
import { ProjectSectionComponent } from './components/project-section/project-section.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentSectionComponent } from './components/content-section/content-section.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    sideBarComponent,
    CompilerTerminalComponent,
    ProjectSectionComponent,
    NavBarComponent,
    ContentSectionComponent,
  ],
  imports: [
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [
    sideBarComponent,
    CompilerTerminalComponent,
    ProjectSectionComponent,
    NavBarComponent,
    ContentSectionComponent
  ]
})
export class SharedModule { }
