import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

import { SlideInLeftAnimation } from './SlideInLeft';
import { SlideOutLeftAnimation } from './SlideOutLeft';
import { SlideInRightAnimation } from './SlideInRight';
import { SlideOutRightAnimation } from './SlideOutRight';

const PageSlideBackward = transition.div`
  &:enter {
    animation: ${SlideInLeftAnimation} 1s forwards;
  }
  
  &:exit {
    animation: ${SlideOutRightAnimation} 1s forwards;
  }
`;

const PageSlideForward = transition.div`
  &:enter {
    animation: ${SlideInRightAnimation} 1s forwards;
  }
  
  &:exit {
    animation: ${SlideOutLeftAnimation} 1s forwards;
  }
`;

const PageSlide = props =>
  props.backwards ? (
    <PageSlideBackward {...props} timeout={1000}>
      {props.children}
    </PageSlideBackward>
  ) : (
    <PageSlideForward {...props} timeout={1000}>
      {props.children}
    </PageSlideForward>
  );

const PageSlideStyled = styled(PageSlide)`
  width: 100%;
  position: absolute;
`;

export default PageSlideStyled;
