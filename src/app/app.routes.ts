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
    path: 'batch-search',
    loadComponent: () =>
      import('./components/pages/batch-search/batch-search.component').then(m => m.BatchSearchComponent)
  },
  {
    path: 'batch-simple',
    loadComponent: () =>
      import('./components/pages/simple-search/simple-search.component').then(m => m.BatchSimpleComponent)
  }
];
