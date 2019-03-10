import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const SlideOutLeftAnimation = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100vw, 0, 0);
    visibility: hidden;
  }
`;

const SlideOutLeft = transition.div`
  &:enter { 
    animation: ${SlideOutLeftAnimation} 1s forwards;
  }
`;

export default SlideOutLeft;
export { SlideOutLeftAnimation };
