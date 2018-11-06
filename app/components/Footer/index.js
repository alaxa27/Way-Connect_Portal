/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FooterWrapper from './FooterWrapper';
import ArrowWrapper from './ArrowWrapper';
import DotsWrapper from './DotsWrapper';
import Dot from './Dot';

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  render() {
    return (
      <FooterWrapper>
        <ArrowWrapper transparent>
          <FontAwesomeIcon icon={faArrowLeft} />
        </ArrowWrapper>
        <DotsWrapper>
          <Dot passed />
          <Dot passed />
          <Dot active />
          <Dot />
        </DotsWrapper>
        <ArrowWrapper>
          <FontAwesomeIcon icon={faArrowRight} />
        </ArrowWrapper>
      </FooterWrapper>
    );
  }
}

Footer.propTypes = {};

export default Footer;
