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
import CommunicationTitle from './CommunicationTitle';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Communication extends React.Component {
  renderPhoneNumber() {
    const { redirection } = this.props;
    if (redirection)
      return <PhoneNumber {...this.props}>Contact direct</PhoneNumber>;
    return null;
  }

  render() {
    const { campaign } = this.props;
    return (
      <CommunicationWrapper>
        <CommunicationTitle>{`${campaign.company_name} | ${
          campaign.name
        }`}</CommunicationTitle>
        {this.renderPhoneNumber()}
        <VideoPlayer {...this.props} />
      </CommunicationWrapper>
    );
  }
}

Communication.propTypes = {
  campaign: PropTypes.shape({
    name: PropTypes.string,
    company_name: PropTypes.string,
  }),
};

export default Communication;
