/**
 *
 * Communication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import VideoPlayer from 'components/VideoPlayer';

import CommunicationWrapper from './CommunicationWrapper';
import CommunicationTitle from './CommunicationTitle';
import RedirectionLink from '../RedirectionLink';
import GlobalStyle from '../../global-styles';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Communication extends React.Component {
  render() {
    const { campaign } = this.props;
    return (
      <React.Fragment>
        <CommunicationWrapper>
          <VideoPlayer {...this.props} />
          <RedirectionLink {...this.props} />
          <CommunicationTitle>{`${campaign.company_name} | ${
            campaign.name
          }`}</CommunicationTitle>
        </CommunicationWrapper>
        <GlobalStyle videoScreen />
      </React.Fragment>
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
