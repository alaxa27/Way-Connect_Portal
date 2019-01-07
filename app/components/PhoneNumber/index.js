/**
 *
 * PhoneNumber
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import PhoneNumberWrapper from './PhoneNumberWrapper';

/* eslint-disable react/prefer-stateless-function */
class PhoneNumber extends React.Component {
  render() {
    const { children, onRedirectionClick } = this.props;
    return (
      <PhoneNumberWrapper href="#" onClick={onRedirectionClick}>
        {children}
      </PhoneNumberWrapper>
    );
  }
}

PhoneNumber.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  onRedirectionClick: PropTypes.func,
};

export default PhoneNumber;
