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
import Title from 'components/Title';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoaderPage, { makeSelectEstablishmentName } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import HomeWrapper from './HomeWrapper';
import WayConnectWrapper from './WayConnectWrapper';
import WayConnectLogo from './WayConnectLogo';
import Moto from './Moto';
import WelcomeMessage from './WelcomeMessage';
import EstablishmentName from './EstablishmentName';

/* eslint-disable react/prefer-stateless-function */
export class LoaderPage extends React.Component {
  render() {
    const { establishmentName } = this.props;

    return (
      <HomeWrapper>
        <WayConnectWrapper>
          <WayConnectLogo src={logoWhiteTransparent} />
          <Title>Way-Connect</Title>
          <Moto>SMART ADVERTISING</Moto>
        </WayConnectWrapper>
        <WelcomeMessage>
          <p>Bienvenue sur le WiFi de</p>
          <EstablishmentName>{establishmentName}</EstablishmentName>
        </WelcomeMessage>
      </HomeWrapper>
    );
  }
}

LoaderPage.propTypes = {
  establishmentName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loaderPage: makeSelectLoaderPage(),
  establishmentName: makeSelectEstablishmentName(),
});

function mapDispatchToProps() {
  return {};
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
