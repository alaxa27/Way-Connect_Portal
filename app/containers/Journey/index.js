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
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      journey: [
        {
          type: 'Q',
          question: {
            type: 'CHOICE',
            text: 'FOOBARBAZ ????',
            multiple: false,
            choices: [
              {
                id: 1,
                text: 'foo',
              },
              {
                id: 2,
                text: 'bar',
              },
              {
                id: 3,
                text: 'baz',
              },
            ],
          },
        },
        {
          type: 'Q',
          question: {
            type: 'CHOICE',
            text: 'Multiple foobarbaz ?????',
            multiple: true,
            choices: [
              {
                id: 1,
                text: 'foo',
              },
              {
                id: 2,
                text: 'bar',
              },
              {
                id: 3,
                text: 'baz',
              },
            ],
          },
        },
        {
          type: 'Q',
          question: {
            type: 'VALUE',
            text: 'How much?',
            min: 1, // may be null
            max: 10, // may be null
            step: 1, // may be null
          },
        },
        {
          type: 'Q',
          question: {
            type: 'VALUE_RANGE',
            text: 'How much?',
            min: 1, // may be null
            max: 10, // may be null
            step: 1, // may be null
          },
        },
      ],
    };
  }

  renderJourneyItem(item) {
    switch (item.type) {
      case 'Q':
        return <Question {...item.question} />;
      default:
        return null;
    }
  }

  render() {
    const { index } = this.state;
    return (
      <JourneyWrapper>
        <JourneyItem>
          {this.renderJourneyItem(this.state.journey[index])}
        </JourneyItem>
        <Footer index={this.state.index} number={this.state.journey.length} />
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
