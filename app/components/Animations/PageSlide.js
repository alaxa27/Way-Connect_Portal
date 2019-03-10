// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';
import { SlideOutLeftAnimation } from './SlideOutLeft';
import { SlideInRightAnimation } from './SlideInRight';

const PageSlideTransition = transition.div`
  &:enter {
    animation: ${SlideInRightAnimation} 1s forwards;
  }
  
  &:exit {
    animation: ${SlideOutLeftAnimation} 1s forwards;
  }
`;

export default PageSlideTransition;
