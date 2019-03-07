/**
 *
 * LoaderPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import logoWhiteTransparent from 'images/logo_white_transparent.png';
import { FadeIn } from 'components/Animations';
import Title from 'components/Title';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { animationsCompleted } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectLoaderPage, { makeSelectEstablishmentName } from './selectors';
// import messages from './messages';

import HomeWrapper from './HomeWrapper';
import WayConnectWrapper from './WayConnectWrapper';
import WayConnectLogo from './WayConnectLogo';
import Moto from './Moto';
import WelcomeMessage from './WelcomeMessage';
import EstablishmentName from './EstablishmentName';

/* eslint-disable react/prefer-stateless-function */
export class LoaderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: -1,
    };

    this.showNextElement = this.showNextElement.bind(this);
  }

  componentDidMount() {
    this.setState({ showIndex: 0 });
    this.showNextElement(500, 4);
  }

  showNextElement(timeout, numElements) {
    setTimeout(() => {
      this.setState(prevState => ({ showIndex: prevState.showIndex + 1 }));
      if (this.state.showIndex < numElements)
        this.showNextElement(timeout, numElements);
    }, timeout);
  }

  render() {
    const { establishmentName } = this.props;
    const { showIndex } = this.state;

    return (
      <HomeWrapper>
        <WayConnectWrapper>
          <FadeIn in={showIndex > 0}>
            <WayConnectLogo src={logoWhiteTransparent} />
          </FadeIn>
          <FadeIn in={showIndex > 1}>
            <Title>Way-Connect</Title>
          </FadeIn>
          <FadeIn in={showIndex > 2}>
            <Moto>SMART ADVERTISING</Moto>
          </FadeIn>
        </WayConnectWrapper>
        <FadeIn
          in={showIndex > 3 && establishmentName.length > 0}
          timeout={1000}
          onEntered={this.props.animationsCompleted}
        >
          <WelcomeMessage>
            <p>Bienvenue sur le WiFi de</p>
            <EstablishmentName>{establishmentName}</EstablishmentName>
          </WelcomeMessage>
        </FadeIn>
      </HomeWrapper>
    );
  }
}

LoaderPage.propTypes = {
  animationsCompleted: PropTypes.func,
  establishmentName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loaderPage: makeSelectLoaderPage(),
  establishmentName: makeSelectEstablishmentName(),
});

function mapDispatchToProps(dispatch) {
  return {
    animationsCompleted: () => dispatch(animationsCompleted()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loaderPage', reducer });
const withSaga = injectSaga({ key: 'loaderPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoaderPage);
