import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'redirect', pathMatch: 'full' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule', canActivate:[AuthGuard] },
  { path: 'slides', loadChildren: './pages/slides/slides.module#SlidesPageModule', canActivate:[LoggedGuard]},
  { path: 'redirect', loadChildren: './pages/redirect/redirect.module#RedirectPageModule', canActivate:[AuthGuard]  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
