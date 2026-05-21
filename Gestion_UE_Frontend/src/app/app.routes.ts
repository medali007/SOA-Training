import { Routes } from '@angular/router';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { ModuleFormComponent } from './components/module-form/module-form.component';
import { UeListComponent } from './components/ue-list/ue-list.component';
import { UeFormComponent } from './components/ue-form/ue-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/modules', pathMatch: 'full' },
  { path: 'modules', component: ModuleListComponent },
  { path: 'module-form', component: ModuleFormComponent },
  { path: 'module-form/:matricule', component: ModuleFormComponent },
  { path: 'ue', component: UeListComponent },
  { path: 'ue-form', component: UeFormComponent },
  { path: 'ue-form/:code', component: UeFormComponent }
];
