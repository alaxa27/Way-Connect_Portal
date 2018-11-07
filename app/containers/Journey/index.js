/**
 *
 * Journey
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Footer from 'components/Footer';
import Question from 'components/Question';

import injectReducer from 'utils/injectReducer';
import makeSelectJourney from './selectors';
import reducer from './reducer';

import JourneyWrapper from './JourneyWrapper';
import JourneyItem from './JourneyItem';

/* eslint-disable react/prefer-stateless-function */
export class Journey extends React.Component {
  render() {
    return (
      <JourneyWrapper>
        <JourneyItem>
          <Question />
        </JourneyItem>
        <Footer index={4} number={6} active />
      </JourneyWrapper>
    );
  }
}

Journey.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  journey: makeSelectJourney(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'journey', reducer });

export default compose(
  withReducer,
  withConnect,
)(Journey);
