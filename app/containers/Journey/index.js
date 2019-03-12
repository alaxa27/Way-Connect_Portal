/**
 *
 * Journey
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { PageSlide } from 'components/Animations';
import Loading from 'components/Loading';
import Footer from 'components/Footer';
import Question from 'components/Question/Loadable';
import Fidelity from 'components/Fidelity/Loadable';
import Communication from 'components/Communication/Loadable';
import CustomerService from 'components/CustomerService/Loadable';
import Banner from 'components/Banner/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCurrentJourneyItem,
  makeSelectJourneySize,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import JourneyWrapper from './JourneyWrapper';
import JourneyItem from './JourneyItem';

import {
  authenticate,
  changeID,
  changeDefaultAnswersList,
  changeWatchedSeconds,
  goToNextJourneyItem,
  onRedirectionClick,
  skipVideo,
  submitSurveyResult,
} from './actions';

const timeBeforeSkip = 5; // Skip the ad available after 5sec

/* eslint-disable react/prefer-stateless-function */
export class Journey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: -1,
      footerActive: false,
      countDown: 0,
    };

    this.activateFooter = this.activateFooter.bind(this);
    this.deactivateFooter = this.deactivateFooter.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
    this.onCommunicationProgress = this.onCommunicationProgress.bind(this);
    this.onSurveyLastAnswer = this.onSurveyLastAnswer.bind(this);
  }

  componentDidMount() {
    ReactGA.event({
      category: 'Journey',
      action: 'componentDidMount',
    });
    this.changeIndex(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.changeIndex(this.props.match.params.id);
      this.deactivateFooter();
    }
    if (prevProps.currentJourneyItem !== this.props.currentJourneyItem) {
      switch (this.props.currentJourneyItem.toJS().type) {
        case 'F':
          this.activateFooter();
          break;
        case 'S':
          // Go to the next journeyItem after n secs
          this.goToNextJourneyItem(5);
          this.activateFooter();
          break;
        case 'B':
          // Go to the next journeyItem after n secs
          this.goToNextJourneyItem(5);
          this.activateFooter();
          break;
        default:
          break;
      }
    }
  }

  changeIndex(index) {
    this.props.changeID(index);
    this.setState({
      index: parseInt(index, 10),
    });
    this.initTimer();
  }

  activateFooter() {
    this.setState({ footerActive: true });
  }

  deactivateFooter() {
    clearTimeout(this.state.goToNextJourneyItemTimer);
    this.setState({ footerActive: false, countDown: 0 });
  }

  goToNextJourneyItem(timeout) {
    const goToNextJourneyItemTimer = setTimeout(() => {
      ReactGA.event({
        category: 'Journey',
        action: 'goToNextJourneyItem/endTimeout',
        label: `timeout: ${timeout}`,
      });
      this.props.goToNextJourneyItem();
    }, timeout * 1000);
    this.setState({ goToNextJourneyItemTimer });
  }

  initTimer() {
    this.setState({ journeyItemStartTime: Date.now() });
  }

  validateAnswer(defaultAnswers) {
    const question = this.props.currentJourneyItem.get('question');
    this.props.changeDefaultAnswersList(defaultAnswers, question.get('id'));
    // Google Analytics : Time spent rendering and aswering question
    ReactGA.timing({
      category: 'Journey',
      variable: 'question/timeBeforeAnswered',
      value: Date.now() - this.state.journeyItemStartTime,
    });
    this.activateFooter();
  }

  onSurveyLastAnswer(result) {
    this.props.submitSurveyResult(result);
    this.activateFooter();
  }

  onCommunicationProgress(progress, currentTime, prevCurrentTime) {
    const countDown = Math.max(timeBeforeSkip - Math.floor(currentTime), 0);
    this.setState({ countDown });
    if (countDown === 0) {
      this.activateFooter();
    }

    this.props.changeWatchedSeconds(Math.floor(currentTime));

    if (progress === 1) {
      ReactGA.event({
        category: 'Journey',
        action: 'communication/watchedEntirely',
      });
      this.goToNextJourneyItem(0);
    }
    if (prevCurrentTime === 0 && currentTime > 0) {
      ReactGA.event({
        category: 'Journey',
        action: 'communication/startPlaying',
      });
      ReactGA.timing({
        category: 'Journey',
        variable: 'communication/timBeforePlayStart',
        value: Date.now() - this.state.journeyItemStartTime,
      });
    }
  }

  renderJourneyItem(item) {
    if (item) {
      switch (item.type) {
        case 'Q':
          return <Question onValid={this.validateAnswer} {...item.question} />;
        case 'F':
          return <Fidelity {...item.fidelity} onActiveClick={() => {}} />;
        case 'C':
          return (
            <Communication
              {...item.communication}
              onProgress={this.onCommunicationProgress}
              onLastAnswer={this.onSurveyLastAnswer}
              onRedirectionClick={this.props.onRedirectionClick}
              playing
            />
          );
        case 'S':
          return <CustomerService {...item.customer_service} />;
        case 'B':
          return <Banner {...item.banner} />;
        case 'END':
          return <Loading />;
        default:
          return null;
      }
    }
    return null;
  }

  render() {
    const { currentJourneyItem, journeySize, location } = this.props;
    const { countDown, footerActive, index } = this.state;
    return (
      <JourneyWrapper>
        <JourneyItem>
          <TransitionGroup>
            <PageSlide
              key={index}
              unmountOnExit
              mountOnEnter
              backwards={location.state ? location.state.prev : false}
            >
              {this.renderJourneyItem(currentJourneyItem.toJS())}
            </PageSlide>
          </TransitionGroup>
        </JourneyItem>
        <Footer
          active={footerActive}
          index={index}
          number={journeySize}
          countDown={countDown}
        />
      </JourneyWrapper>
    );
  }
}

Journey.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // tok: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentJourneyItem: makeSelectCurrentJourneyItem(),
  journeySize: makeSelectJourneySize(),
});

function mapDispatchToProps(dispatch) {
  return {
    skipVideo: () => dispatch(skipVideo()),
    authenticate: () => dispatch(authenticate()),
    changeID: curID => dispatch(changeID(curID)),
    changeDefaultAnswersList: (defAns, id) =>
      dispatch(changeDefaultAnswersList(defAns, id)),
    changeWatchedSeconds: s => dispatch(changeWatchedSeconds(s)),
    goToNextJourneyItem: () => dispatch(goToNextJourneyItem()),
    onRedirectionClick: () => dispatch(onRedirectionClick()),
    submitSurveyResult: res => dispatch(submitSurveyResult(res)),
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
  withRouter,
)(Journey);
