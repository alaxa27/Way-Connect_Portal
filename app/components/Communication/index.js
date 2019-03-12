/**
 *
 * Communication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Survey from 'components/Survey';
import VideoPlayer from 'components/VideoPlayer';

import CommunicationWrapper from './CommunicationWrapper';
import CommunicationTitle from './CommunicationTitle';
import RedirectionLink from '../RedirectionLink';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Communication extends React.Component {
  renderCommunication(type) {
    switch (type) {
      case 'SURVEY':
        return <Survey {...this.props} />;
      case 'VIDEO':
        return <VideoPlayer {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    const { campaign, type } = this.props;
    return (
      <React.Fragment>
        <CommunicationWrapper>
          <CommunicationTitle>{`${campaign.company_name} | ${
            campaign.name
          }`}</CommunicationTitle>
          <RedirectionLink {...this.props} />
          {this.renderCommunication(type)}
        </CommunicationWrapper>
      </React.Fragment>
    );
  }
}

Communication.propTypes = {
  campaign: PropTypes.shape({
    name: PropTypes.string,
    company_name: PropTypes.string,
  }),
  type: PropTypes.string,
};

export default Communication;
