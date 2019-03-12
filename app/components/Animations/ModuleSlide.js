import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

import { SlideInDownAnimation } from './SlideInDown';
import { SlideOutDownAnimation } from './SlideOutDown';
import { SlideInUpAnimation } from './SlideInUp';
import { SlideOutUpAnimation } from './SlideOutUp';

const ModuleSlideBackward = transition.div`
  &:enter {
    animation: ${SlideInUpAnimation} 1s forwards;
  }
  
  &:exit {
    animation: ${SlideOutUpAnimation} 1s forwards;
  }
`;

const ModuleSlideForward = transition.div`
  &:enter {
    animation: ${SlideInDownAnimation} 1s forwards;
  }
  
  &:exit {
    animation: ${SlideOutDownAnimation} 1s forwards;
  }
`;

const ModuleSlide = props =>
  props.backwards ? (
    <ModuleSlideBackward {...props} timeout={1000}>
      {props.children}
    </ModuleSlideBackward>
  ) : (
    <ModuleSlideForward {...props} timeout={1000}>
      {props.children}
    </ModuleSlideForward>
  );

const ModuleSlideStyled = styled(ModuleSlide)`
  width: 100%;
  position: absolute;
`;

export default ModuleSlideStyled;
