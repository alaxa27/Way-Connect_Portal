import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const RotateInAnimationRight = keyframes`
from {
  transform-origin: center;
  transform: rotate3d(0, 0, 1, -200deg);
  opacity: 0;
}
to {
  transform-origin: center;
  transform: none;
  opacity: 1;
}
`;

const RotateInAnimationLeft = keyframes`
from {
  transform-origin: center;
  transform: rotate3d(0, 0, 1, 200deg);
  opacity: 0;
}
to {
  transform-origin: center;
  transform: none;
  opacity: 1;
}
`;
const RotateIn = transition.div`
&:enter { 
  animation: ${props =>
    props.direction === 'left'
      ? RotateInAnimationLeft
      : RotateInAnimationRight} 1s forwards;
}
`;

RotateIn.propTypes = {};

export default RotateIn;
