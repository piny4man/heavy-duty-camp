import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/balance/balance.component').then(
        (m) => m.HomePageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
