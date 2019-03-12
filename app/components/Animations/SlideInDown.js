import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const SlideInDownAnimation = keyframes`
  from {
      transform: translate3d(0, -100vh, 0);
      visibility: visible;
   }
   to {
      transform: translate3d(0, 0, 0);
   }
`;

const SlideInUp = transition.div`
  &:enter { 
    animation: ${SlideInDownAnimation} 1s forwards;
  }
`;

SlideInUp.propTypes = {};

export default SlideInUp;
export { SlideInDownAnimation };
