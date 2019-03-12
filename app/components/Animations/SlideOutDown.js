import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const SlideOutDownAnimation = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 100vh, 0);
    visibility: hidden;
  }
`;

const SlideOutDown = transition.div`
  &:enter { 
    animation: ${SlideOutDownAnimation} 1s forwards;
  }
`;

export default SlideOutDown;
export { SlideOutDownAnimation };
