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
  redirectTo() {
    const { redirection, onRedirectionClick } = this.props;
    onRedirectionClick(redirection);
  }

  render() {
    const { children } = this.props;
    return (
      <PhoneNumberWrapper href="#" onClick={this.redirectTo}>
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
  redirection: PropTypes.string,
};

export default PhoneNumber;
