import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const slideInUpAnimation = keyframes`
  from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
      opacity: 0.01;
   }
   to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
   }
`;

const SlideInUp = transition.div`
  &:enter { 
    animation: ${slideInUpAnimation} 1s forwards;
  }
`;

SlideInUp.propTypes = {};

export default SlideInUp;
