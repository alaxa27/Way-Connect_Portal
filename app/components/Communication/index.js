/**
 *
 * Communication
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import VideoPlayer from 'components/VideoPlayer';
import CommunicationWrapper from './CommunicationWrapper';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Communication extends React.Component {
  render() {
    return (
      <CommunicationWrapper>
        <VideoPlayer {...this.props} />
      </CommunicationWrapper>
    );
  }
}

Communication.propTypes = {};

export default Communication;
