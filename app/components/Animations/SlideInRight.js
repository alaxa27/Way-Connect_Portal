import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const SlideInRightAnimation = keyframes`
  from {
      transform: translate3d(100vw, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
`;

const SlideInRight = transition.div`
  &:enter { 
    animation: ${SlideInRightAnimation} 1s forwards;
  }
`;

export default SlideInRight;
export { SlideInRightAnimation };
