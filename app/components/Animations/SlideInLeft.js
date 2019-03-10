import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const SlideInLeftAnimation = keyframes`
  from {
    transform: translate3d(-100vw, 0, 0);
    visibility: visible;
  }
  to {
      transform: translate3d(0, 0, 0);
    }
`;

const SlideInLeft = transition.div`
  &:enter { 
    animation: ${SlideInLeftAnimation} 1s forwards;
  }
`;

export default SlideInLeft;
export { SlideInLeftAnimation };
