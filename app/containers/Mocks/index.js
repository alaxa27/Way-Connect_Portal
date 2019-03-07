/**
 *
 * Mock
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import JourneyMocks from './JourneyMocks';
import LoaderPageMock from './LoaderPageMock';

/* eslint-disable react/prefer-stateless-function */
export class Mocks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/mocks/journey/:type/:sample"
          component={JourneyMocks}
        />
        <Route exact path="/mocks/loaderpage" component={LoaderPageMock} />
      </React.Fragment>
    );
  }
}

Mocks.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Mocks);
