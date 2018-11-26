/**
 *
 * Communication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import VideoPlayer from 'components/VideoPlayer';
import PhoneNumber from 'components/PhoneNumber';
import CommunicationWrapper from './CommunicationWrapper';
// import CommunicationTitle from './CommunicationTitle';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Communication extends React.Component {
  renderPhoneNumber(phoneNumber) {
    if (phoneNumber)
      return (
        <PhoneNumber phoneNumber={phoneNumber}>Contact direct</PhoneNumber>
      );
    return null;
  }

  render() {
    return (
      <CommunicationWrapper>
        {/* <CommunicationTitle>Chanel | Bleu, fragrance homme</CommunicationTitle> */}
        {this.renderPhoneNumber(this.props.phone_number)}
        <VideoPlayer {...this.props} />
      </CommunicationWrapper>
    );
  }
}

Communication.propTypes = {
  phone_number: PropTypes.string,
};

export default Communication;
