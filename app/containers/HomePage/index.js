/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import logoWhiteTransparent from 'images/logo_white_transparent.png';
import HomeWrapper from './HomeWrapper';
import WayConnectWrapper from './WayConnectWrapper';
import WayConnectLogo from './WayConnectLogo';
import Title from './Title';
import Moto from './Moto';
import WelcomeMessage from './WelcomeMessage';
import EstablishmentName from './EstablishmentName';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <HomeWrapper>
        <WayConnectWrapper>
          <WayConnectLogo src={logoWhiteTransparent} />
          <Title>Way-Connect</Title>
          <Moto>SMART ADVERTISING</Moto>
        </WayConnectWrapper>
        <WelcomeMessage>
          <p>Bienvenue sur le WiFi de</p>
          <EstablishmentName>180 DEGRES</EstablishmentName>
        </WelcomeMessage>
      </HomeWrapper>
    );
  }
}
