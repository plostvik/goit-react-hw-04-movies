import route from './router.js';
import { lazy } from 'react';

const routes = [
  {
    path: route.home,
    exact: true,
    component: lazy(() => import('./components/pages/HomePage')),
  },
  {
    path: route.movies,
    exact: true,
    component: lazy(() => import('./components/pages/MoviesPage')),
  },
  {
    path: route.movieDetails,
    exact: false,
    component: lazy(() =>
      import('./components/pages/HomePage/MovieDetailsPage'),
    ),
  },
  {
    path: null,
    exact: false,
    component: lazy(() => import('./components/pages/NotFounPage')),
  },
];

export default routes;
