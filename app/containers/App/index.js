/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoaderPage from 'containers/LoaderPage/Loadable';
import Journey from 'containers/Journey/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// TODO: remove before going to production.
import Banner from 'components/Banner/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LoaderPage} />
        <Route exact path="/journey/:id" component={Journey} />
        <Route exact path="/banner" component={Banner} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
