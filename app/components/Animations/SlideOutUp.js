import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const SlideOutUpAnimation = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -100%, 0);
    visibility: hidden;
  }
`;

const SlideOutUp = transition.div`
  &:enter { 
    animation: ${SlideOutUpAnimation} 1s forwards;
  }
`;

export default SlideOutUp;
export { SlideOutUpAnimation };
