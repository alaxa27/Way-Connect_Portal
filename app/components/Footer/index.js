/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import _ from 'underscore';

import rightArrow from 'images/right-arrow_footer.png';
import leftArrow from 'images/left-arrow_footer.png';

import Slider from 'components/Slider';
import ActivableLink from 'components/ActivableLink';
import FooterWrapper from './FooterWrapper';
import ArrowWrapper from './ArrowWrapper';
import DotsWrapper from './DotsWrapper';
import Dot from './Dot';

const Arrow = styled.img``;

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  renderBack() {
    const { index } = this.props;

    if (index !== 0) {
      return (
        <Link to={`/journey/${index - 1}`}>
          <ArrowWrapper transparent>
            <Arrow src={leftArrow} />
          </ArrowWrapper>
        </Link>
      );
    }
    return <ArrowWrapper transparent />;
  }

  renderNext() {
    const { index, number, active, countDown } = this.props;

    if (index === number - 1) {
      return <Slider>{this.renderCountDown(countDown)}</Slider>;
    }
    return (
      <React.Fragment>
        <DotsWrapper>
          {_.times(number, i => (
            <Dot key={i} passed={i < index} active={i === index} />
          ))}
        </DotsWrapper>
        <ActivableLink active={active} to={`/journey/${index + 1}`}>
          <ArrowWrapper active={active}>
            {this.renderCountDown(countDown) || <Arrow src={rightArrow} />}
          </ArrowWrapper>
        </ActivableLink>
      </React.Fragment>
    );
  }

  renderCountDown(countDown) {
    if (countDown > 0) {
      return countDown;
    }
    return null;
  }

  render() {
    return (
      <FooterWrapper>
        {this.renderBack()}
        {this.renderNext()}
      </FooterWrapper>
    );
  }
}

Footer.defaultProps = {
  active: false,
  countDown: 0,
};

Footer.propTypes = {
  number: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  active: PropTypes.bool,
  countDown: PropTypes.number,
};

export default Footer;
