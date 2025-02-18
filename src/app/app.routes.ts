import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'cvt',
    loadComponent: () =>
      import('./components/pages/cvt/cvt.component').then(m => m.CvtComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/pages/admin-cvt/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'roles',
    loadComponent: () =>
      import('./components/pages/admin-cvt/roles/roles.component').then(m => m.RolesComponent)
  },
  {
    path: 'modules',
    loadComponent: () =>
      import('./components/pages/admin-cvt/modules/modules.component').then(m => m.ModulesComponent)
  },
  {
    path: 'batch-search',
    loadComponent: () =>
      import('./components/pages/cvt/batch-search/batch-search.component').then(m => m.BatchSearchComponent)
  },
  {
    path: 'batch-simple',
    loadComponent: () =>
      import('./components/pages/cvt/simple-search/simple-search.component').then(m => m.BatchSimpleComponent)
  }
];
