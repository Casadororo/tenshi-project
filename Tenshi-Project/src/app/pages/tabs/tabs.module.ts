import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'option',
    component: TabsPage,
    children: [
      { path: 'tabHome', loadChildren: '../tabs/home/home.module#HomePageModule' },
      { path: 'tabMembros', loadChildren: '../tabs/membros/membros.module#MembrosPageModule' },
      { path: 'tabSettings', loadChildren: '../tabs/settings/settings.module#SettingsPageModule' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'option/tabHome' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
