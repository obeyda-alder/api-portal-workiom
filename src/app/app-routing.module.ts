import { NgModule } from '@angular/core';
import { ActivatedRoute, ExtraOptions, PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { SharedService } from './shared/service/shared.service';
import { AuthComponent } from './auth/components/auth.component';


const routes: Routes = [
  {path: "introduction"        , loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule)},
  {path: "project/:sections"   , loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)},
  {path: "errors-page"         , loadChildren: () => import('./errors-page/errors-page.module').then(m => m.ErrorsPageModule)},
  {path: "api-portal/workiom"  , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: "workiom/api/:auth"   , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: "**" , redirectTo: "introduction", pathMatch: 'full'},
];

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy       : PreloadAllModules,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
