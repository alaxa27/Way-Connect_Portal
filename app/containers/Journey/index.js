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

import Footer from 'components/Footer/Loadable';
import Question from 'components/Question/Loadable';
import Fidelity from 'components/Fidelity/Loadable';
import Communication from 'components/Communication/Loadable';
import CustomerService from 'components/CustomerService/Loadable';
import Banner from 'components/Banner/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectJourney from './selectors';
import reducer from './reducer';
import saga from './saga';

import JourneyWrapper from './JourneyWrapper';
import JourneyItem from './JourneyItem';

import {
  skipVideo,
  authenticate,
  changeID,
  changeDefaultAnswersList,
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
      journey: [],
    };

    this.activateFooter = this.activateFooter.bind(this);
    this.deactivateFooter = this.deactivateFooter.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
    this.onCommunicationProgress = this.onCommunicationProgress.bind(this);
  }

  componentDidMount() {
    this.changeIndex(this.props.match.params.id);
    this.setState({
      journey: this.props.journey.toJS(),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.changeIndex(this.props.match.params.id);
      this.deactivateFooter();
    }
    if (prevProps.journey !== this.props.journey) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        journey: this.props.journey.toJS(),
      });
    }
  }

  changeIndex(index) {
    this.props.changeID(this.state.index);
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
    // eslint-disable-next-line prefer-destructuring
    const index = this.state.index;
    // eslint-disable-next-line prefer-destructuring
    const question = this.state.journey[index].question;
    this.props.changeDefaultAnswersList(defaultAnswers, question.id);
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
    if (item) {
      switch (item.type) {
        case 'Q':
          return <Question onValid={this.validateAnswer} {...item.question} />;
        case 'F':
          if (!this.state.footerActive) this.activateFooter();
          return <Fidelity {...item.fidelity} onActiveClick={() => {}} />;
        case 'C':
          return (
            <Communication
              {...item.communication}
              onProgress={this.onCommunicationProgress}
              playing
            />
          );
        case 'S':
          if (!this.state.footerActive) this.activateFooter();
          return <CustomerService {...item.customer_service} />;
        case 'B':
          if (!this.state.footerActive) this.activateFooter();
          return <Banner {...item.banner} />;
        default:
          return null;
      }
    }
    return null;
  }

  render() {
    const { index, footerActive, journey } = this.state;
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
  // tok: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  journey: makeSelectJourney(),
});

function mapDispatchToProps(dispatch) {
  return {
    skipVideo: () => dispatch(skipVideo()),
    authenticate: () => dispatch(authenticate()),
    changeID: curID => dispatch(changeID(curID)),
    changeDefaultAnswersList: (defAns, id) =>
      dispatch(changeDefaultAnswersList(defAns, id)),
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
