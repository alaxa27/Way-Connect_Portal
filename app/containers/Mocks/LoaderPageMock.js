import React from 'react';
// import PropTypes from 'prop-types';

import logoWhiteTransparent from 'images/logo_white_transparent.png';
import { FadeIn } from 'components/Animations';
import Title from 'components/Title';

import HomeWrapper from 'containers/LoaderPage/HomeWrapper';
import WayConnectWrapper from 'containers/LoaderPage/WayConnectWrapper';
import WayConnectLogo from 'containers/LoaderPage/WayConnectLogo';
import Moto from 'containers/LoaderPage/Moto';
import WelcomeMessage from 'containers/LoaderPage/WelcomeMessage';
import EstablishmentName from 'containers/LoaderPage/EstablishmentName';

class LoaderPageMock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

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
        <FadeIn in={showIndex > 3}>
          <WelcomeMessage>
            <p>Bienvenue sur le WiFi de</p>
            <EstablishmentName>180 Degres</EstablishmentName>
          </WelcomeMessage>
        </FadeIn>
      </HomeWrapper>
    );
  }
}

LoaderPageMock.propTypes = {};

export default LoaderPageMock;
