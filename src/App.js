import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Loader from './components/Loader';
// import HomePage from './components/pages/HomePage';
// import MoviesPage from './components/pages/MoviesPage';
// import MovieDetailsPage from './components/pages/HomePage/MovieDetailsPage';
// import NotFoundPage from './components/pages/NotFounPage';

import routes from './routes.js';
import styles from './App.module.css';

// const AsyncHomePage = lazy(() => import {});

export default class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                );
              })}
              {/* <Route path={routes.home} exact component={HomePage} />
              <Route path={routes.movies} exact component={MoviesPage} />
              <Route path={routes.movieDetails} component={MovieDetailsPage} />
              <Route component={NotFoundPage} /> */}
            </Switch>
          </Suspense>
        </div>
      </>
    );
  }
}
