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
import { ThemeProvider } from 'styled-components';

import LoaderPage from 'containers/LoaderPage';
import Journey from 'containers/Journey';
import Mocks from 'containers/Mocks';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle, { theme } from '../../global-styles';

export default function App() {
  const production = process.env.NODE_ENV === 'production';
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={LoaderPage} />
            <Route exact path="/journey/:id" component={Journey} />
            {production ? null : <Route path="/mocks" component={Mocks} />}
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </React.Fragment>
      </ThemeProvider>
    </React.Fragment>
  );
}
