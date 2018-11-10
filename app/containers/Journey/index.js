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
import Fidelity from 'components/Fidelity';

import injectReducer from 'utils/injectReducer';
import makeSelectJourney from './selectors';
import reducer from './reducer';

import JourneyWrapper from './JourneyWrapper';
import JourneyItem from './JourneyItem';

/* eslint-disable react/prefer-stateless-function */
export class Journey extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props.match.params;

    this.state = {
      index: parseInt(id, 10),
      footerActive: false,
      journey: [
        {
          type: 'Q',
          question: {
            id: 32,
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
            defaultAnswers: [],
          },
        },
        {
          type: 'Q',
          id: 2,
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
            defaultAnswers: [],
          },
        },
        {
          type: 'Q',
          id: 4,
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
          id: 445,
          question: {
            type: 'VALUE_RANGE',
            text: 'How much?',
            min: 1, // may be null
            max: 10, // may be null
            step: 1, // may be null
          },
        },
        {
          type: 'F',
        },
      ],
    };

    this.activateFooter = this.activateFooter.bind(this);
    this.deactivateFooter = this.deactivateFooter.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.changeIndex(this.props.match.params.id);
      this.deactivateFooter();
    }
  }

  changeIndex(index) {
    this.setState({
      index: parseInt(index, 10),
    });
  }

  activateFooter() {
    this.setState({ footerActive: true });
  }

  deactivateFooter() {
    this.setState({ footerActive: false });
  }

  validateAnswer(defaultAnswers) {
    this.setState(prevState => {
      const { index } = prevState;
      const journey = [...prevState.journey];
      journey[index].question.defaultAnswers = defaultAnswers;
      return { journey };
    });
    this.activateFooter();
  }

  renderJourneyItem(item) {
    switch (item.type) {
      case 'Q':
        return <Question onValid={this.validateAnswer} {...item.question} />;
      case 'F':
        return <Fidelity />;
      default:
        return null;
    }
  }

  render() {
    const { index, journey, footerActive } = this.state;

    return (
      <JourneyWrapper>
        <JourneyItem>{this.renderJourneyItem(journey[index])}</JourneyItem>
        <Footer active={footerActive} index={index} number={journey.length} />
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
