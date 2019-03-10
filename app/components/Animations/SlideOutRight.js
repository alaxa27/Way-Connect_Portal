import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const SlideOutRightAnimation = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(100vw, 0, 0);
  }
`;

const SlideOutRight = transition.div`
  &:enter { 
    animation: ${SlideOutRightAnimation} 1s forwards;
  }
`;

export default SlideOutRight;
export { SlideOutRightAnimation };
