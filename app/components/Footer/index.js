/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'underscore';
// import styled from 'styled-components';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Slider from 'components/Slider';
import ActivableLink from 'components/ActivableLink';
import FooterWrapper from './FooterWrapper';
import ArrowWrapper from './ArrowWrapper';
import DotsWrapper from './DotsWrapper';
import Dot from './Dot';

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  renderNext() {
    const { index, number, active } = this.props;

    if (index === number - 1) {
      return <Slider />;
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
            <FontAwesomeIcon icon={faArrowRight} />
          </ArrowWrapper>
        </ActivableLink>
      </React.Fragment>
    );
  }

  renderBack() {
    const { index } = this.props;

    if (index !== 0) {
      return (
        <Link to={`/journey/${index - 1}`}>
          <ArrowWrapper transparent>
            <FontAwesomeIcon icon={faArrowLeft} />
          </ArrowWrapper>
        </Link>
      );
    }
    return <ArrowWrapper transparent />;
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

Footer.propTypes = {
  number: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

export default Footer;
