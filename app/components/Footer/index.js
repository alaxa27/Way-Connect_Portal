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

import { RotateIn, SlideInUp, ZoomIn } from 'components/Animations';
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
      zoomInEntered: false,
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
    const { pageEntered, showDot, zoomInEntered } = this.state;

    return (
      <React.Fragment>
        <DotsWrapper>
          {_.times(number, i => (
            <SlideInUp
              in={showDot >= i}
              key={i}
              timeout={1000}
              style={{ opacity: showDot < i ? '0' : null }}
            >
              <Dot key={i} passed={i < index} active={i === index} />
            </SlideInUp>
          ))}
        </DotsWrapper>
        <ActivableLink
          active={active && zoomInEntered}
          to={`/journey/${index + 1}`}
        >
          <ZoomIn
            in={pageEntered}
            onEntered={() => {
              this.setState({ zoomInEntered: true });
            }}
            timeout={1000}
          >
            <ArrowWrapper active={active}>
              <RotateIn in={pageEntered} timeout={1000}>
                {this.renderCountDown(countDown) || <Arrow src={rightArrow} />}
              </RotateIn>
            </ArrowWrapper>
          </ZoomIn>
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
    const { index } = this.props;
    return (
      <FooterWrapper>
        <RotateIn direction="left" in={index > 0} timeout={1000}>
          {this.renderBack()}
        </RotateIn>
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
