import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const RotateOutAnimation = keyframes`
  from {
      transform-origin: center;
      opacity: 1;
    }
    to {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, 200deg);
      opacity: 0;
    }
`;

const RotateOut = transition.div`
  &:enter { 
    animation: ${RotateOutAnimation} 1s forwards;
  }
`;

RotateOut.propTypes = {};

export default RotateOut;
