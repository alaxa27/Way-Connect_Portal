/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
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
          {_.times(this.props.number, i => (
            <Dot
              key={i}
              passed={i < this.props.index}
              active={i === this.props.index}
            />
          ))}
        </DotsWrapper>
        <ArrowWrapper active={this.props.active}>
          <FontAwesomeIcon icon={faArrowRight} />
        </ArrowWrapper>
      </FooterWrapper>
    );
  }
}

Footer.propTypes = {
  number: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

export default Footer;
