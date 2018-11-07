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

import Slider from 'components/Slider';
import FooterWrapper from './FooterWrapper';
import ArrowWrapper from './ArrowWrapper';
import DotsWrapper from './DotsWrapper';
import Dot from './Dot';

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  renderSlider() {
    if (this.props.index === this.props.number - 1) {
      return <Slider />;
    }
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  render() {
    return (
      <FooterWrapper>
        <ArrowWrapper transparent>
          <FontAwesomeIcon icon={faArrowLeft} />
        </ArrowWrapper>
        {this.renderSlider()}
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
