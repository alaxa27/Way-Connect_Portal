/**
 *
 * PhoneNumber
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import RedirectionLinkText from './RedirectionLinkText';
import RedirectionLinkIcon from './RedirectionLinkIcon';
import RedirectionLinkWrapper from './RedirectionLinkWrapper';

/* eslint-disable react/prefer-stateless-function */
class RedirectionLink extends React.Component {
  render() {
    const { onRedirectionClick, redirection } = this.props;
    return (
      <RedirectionLinkWrapper onClick={onRedirectionClick}>
        <RedirectionLinkIcon {...redirection} />
        <RedirectionLinkText {...redirection} />
      </RedirectionLinkWrapper>
    );
  }
}

RedirectionLink.propTypes = {
  onRedirectionClick: PropTypes.func,
  redirection: PropTypes.object,
};

export default RedirectionLink;
