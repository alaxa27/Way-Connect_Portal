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

import { BounceIn, RotateIn, SlideInUp } from 'components/Animations';
import rightArrow from 'images/right-arrow_footer.png';
import leftArrow from 'images/left-arrow_footer.png';

import ActivableLink from 'components/ActivableLink';
import ArrowWrapper from './ArrowWrapper';
import FooterWrapper from './FooterWrapper';
import DotsWrapper from './DotsWrapper';
import Dot from './Dot';

const Arrow = styled.img``;

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageEntered: false,
    };

    this.showNextDot = this.showNextDot.bind(this);
  }

  componentDidMount() {
    this.setState({ pageEntered: true, showDot: 0 });
    this.showNextDot();
  }

  showNextDot() {
    setTimeout(() => {
      this.setState(prevState => ({ showDot: prevState.showDot + 1 }));
      if (this.state.showDot < this.props.number) this.showNextDot();
    }, 100);
  }

  renderBack() {
    const { index } = this.props;
    const { pageEntered } = this.state;

    if (index !== 0) {
      return (
        <Link to={`/journey/${index - 1}`}>
          <ArrowWrapper transparent>
            <RotateIn direction="left" in={pageEntered}>
              <Arrow src={leftArrow} />
            </RotateIn>
          </ArrowWrapper>
        </Link>
      );
    }
    return <ArrowWrapper transparent />;
  }

  renderNext() {
    const { index, number, active, countDown } = this.props;
    const { pageEntered, showDot } = this.state;

    return (
      <React.Fragment>
        <DotsWrapper>
          {_.times(number, i => (
            <SlideInUp in={showDot >= i} key={i}>
              <Dot key={i} passed={i < index} active={i === index} />
            </SlideInUp>
          ))}
        </DotsWrapper>
        <ActivableLink active={active} to={`/journey/${index + 1}`}>
          <BounceIn in={pageEntered}>
            <ArrowWrapper active={active}>
              <RotateIn in={pageEntered}>
                {this.renderCountDown(countDown) || <Arrow src={rightArrow} />}
              </RotateIn>
            </ArrowWrapper>
          </BounceIn>
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
