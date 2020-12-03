import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Loader from './components/Loader';

import routes from './routes.js';
import styles from './App.module.css';

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
            </Switch>
          </Suspense>
        </div>
      </>
    );
  }
}
