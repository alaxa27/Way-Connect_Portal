/**
 *
 * PhoneNumber
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import RedirectionLinkWrapper from './RedirectionLinkWrapper';

/* eslint-disable react/prefer-stateless-function */
class RedirectionLink extends React.Component {
  displayText(type) {
    switch (type) {
      case 'tel':
        return 'Contactez nous';
      case 'instagram':
        return 'Retrouvez-nous sur Instagram';
      case 'facebook':
        return 'Retrouvez-nous sur Facebook';
      case 'web':
        return 'Visitez notre site-web';
      default:
        return null;
    }
  }

  render() {
    const { onRedirectionClick, redirection } = this.props;
    const { type } = redirection;
    return (
      <RedirectionLinkWrapper href="#" onClick={onRedirectionClick}>
        {this.displayText(type)}
      </RedirectionLinkWrapper>
    );
  }
}

RedirectionLink.propTypes = {
  onRedirectionClick: PropTypes.func,
  redirection: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
};

export default RedirectionLink;
