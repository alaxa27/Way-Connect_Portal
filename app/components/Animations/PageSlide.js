import React from 'react';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

import { SlideInLeftAnimation } from './SlideInLeft';
import { SlideOutLeftAnimation } from './SlideOutLeft';
import { SlideInRightAnimation } from './SlideInRight';
import { SlideOutRightAnimation } from './SlideOutRight';

const PageSlideBackward = transition.div`
  position: absolute;
  &:enter {
    animation: ${SlideInLeftAnimation} 1s forwards;
  }
  
  &:exit {
    animation: ${SlideOutRightAnimation} 1s forwards;
  }
`;

const PageSlideForward = transition.div`
  position: absolute;
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

export default PageSlide;
