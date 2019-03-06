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
import ContactInformations, {
  Text as ContactText,
  Title as ContactTitle,
} from './ContactInformations';

/* eslint-disable react/prefer-stateless-function */
class CustomerService extends React.Component {
  render() {
    return (
      <CustomerServiceWrapper>
        <Title>Contact direct</Title>
        <SubTitle>
          Vous souhaitez nous faire parvenir avis quant à la qualité de notre
          service ?
        </SubTitle>
        <ContactInformations>
          <ContactTitle>Contact direct</ContactTitle>
          <ContactText>{this.props.establishment_name}</ContactText>
          <RedirectionLink {...this.props} />
        </ContactInformations>
      </CustomerServiceWrapper>
    );
  }
}

CustomerService.propTypes = {
  redirection: PropTypes.object.isRequired,
  establishment_name: PropTypes.string.isRequired,
};

export default CustomerService;
