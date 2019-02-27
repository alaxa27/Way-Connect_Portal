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
import JourneyMock from 'containers/Journey/JourneyMock';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle, { theme } from '../../global-styles';

export default function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={LoaderPage} />
          <Route exact path="/journey/:id" component={Journey} />
          <Route
            exact
            path="/mocks/journey/:type/:sample"
            component={JourneyMock}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
      <GlobalStyle />
    </React.Fragment>
  );
}
