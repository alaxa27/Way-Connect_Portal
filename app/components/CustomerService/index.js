/**
 *
 * CustomerService
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import RedirectionLink from 'components/RedirectionLink';
import CustomerServiceWrapper from './CustomerServiceWrapper';
import ContactInformations from './ContactInformations';

/* eslint-disable react/prefer-stateless-function */
class CustomerService extends React.Component {
  render() {
    return (
      <CustomerServiceWrapper>
        <Title>Réclamation</Title>
        <SubTitle>
          Vous souhaitez nous faire parvenir avis quant à la qualité de notre
          service ?
        </SubTitle>
        <ContactInformations>
          <RedirectionLink phoneNumber={this.props.phone_number}>
            {this.props.phone_number}
          </RedirectionLink>
        </ContactInformations>
      </CustomerServiceWrapper>
    );
  }
}

CustomerService.propTypes = {
  phone_number: PropTypes.string.isRequired,
};

export default CustomerService;
