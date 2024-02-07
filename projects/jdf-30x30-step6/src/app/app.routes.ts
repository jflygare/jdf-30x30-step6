import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../../../lib-ui/src/public-api').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'students',
    loadComponent: () =>
      import('../../../lib-ui/src/public-api').then(
        (mod) => mod.StudentDashboardComponent
      ),
  },

  //Wild Card Route for 404 request
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('../../../lib-ui/src/public-api').then(
        (mod) => mod.PageNotFoundComponent
      ),
  },
];
