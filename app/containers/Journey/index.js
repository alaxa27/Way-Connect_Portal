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
import VideoPlayer from 'components/VideoPlayer';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectJourney from './selectors';
import reducer from './reducer';
import saga from './saga';

import JourneyWrapper from './JourneyWrapper';
import JourneyItem from './JourneyItem';

import { skipVideo } from './actions';

const timeBeforeSkip = 5; // Skip the ad available after 5sec

/* eslint-disable react/prefer-stateless-function */
export class Journey extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props.match.params;

    this.state = {
      index: parseInt(id, 10),
      footerActive: false,
      countDown: 0,
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
          question: {
            id: 2,
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
          question: {
            id: 4,
            type: 'VALUE',
            text: 'How much?',
            min: 0, // may be null
            max: 10, // may be null
            step: 1, // may be null
            defaultAnswers: [],
          },
        },
        {
          type: 'Q',
          question: {
            id: 445,
            type: 'VALUE_RANGE',
            text: 'How much?',
            min: 1, // may be null
            max: 10, // may be null
            step: 0.1, // may be null
            defaultAnswers: [],
          },
        },
        {
          type: 'F',
          fidelity: {
            establishment_name: '180 DEGRES',
            current_level: {
              rank: 2,
              current_views: 4,
            },
            discounts: [
              {
                rank: 1, // Already completed level
                reward: '15.00',
                reward_currency: 'EUR',
                offer: 'Coffee',
                required_views: 2,
              },
              {
                rank: 2, // Ongoing level 2
                reward: '19.00',
                reward_currency: 'EUR',
                offer: 'Breakfast',
                required_views: 4,
              },
              {
                rank: 3, // Locked levels
                reward: '23.00',
                reward_currency: 'EUR',
                offer: 'Lunch',
                required_views: 5,
              },
            ],
          },
        },
        {
          type: 'C',
          communication: {
            video: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
          },
        },
      ],
    };

    this.activateFooter = this.activateFooter.bind(this);
    this.deactivateFooter = this.deactivateFooter.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
    this.onCommunicationProgress = this.onCommunicationProgress.bind(this);
  }

  componentDidMount() {
    this.setState({
      journey: this.props.journey,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.changeIndex(this.props.match.params.id);
      this.deactivateFooter();
      if (this.props.journey[this.props.match.params.id].type === 'C') {
        this.props.skipVideo();
      }
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
    this.setState({ footerActive: false, countDown: 0 });
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

  onCommunicationProgress(progress, currentTime) {
    const countDown = Math.max(timeBeforeSkip - Math.floor(currentTime), 0);
    this.setState({ countDown });
    if (countDown === 0) {
      this.activateFooter();
    }
  }

  renderJourneyItem(item) {
    switch (item.type) {
      case 'Q':
        return <Question onValid={this.validateAnswer} {...item.question} />;
      case 'F':
        if (!this.state.footerActive) this.activateFooter();
        return <Fidelity {...item.fidelity} onActiveClick={() => {}} />;
      case 'C':
        return (
          <VideoPlayer
            {...item.communication}
            onProgress={this.onCommunicationProgress}
            playing
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { index, journey, footerActive } = this.state;

    return (
      <JourneyWrapper>
        <JourneyItem>{this.renderJourneyItem(journey[index])}</JourneyItem>
        <Footer
          active={footerActive}
          index={index}
          number={journey.length}
          countDown={this.state.countDown}
        />
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
    skipVideo: () => dispatch(skipVideo()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'journey', reducer });
const withSaga = injectSaga({ key: 'journey', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Journey);
