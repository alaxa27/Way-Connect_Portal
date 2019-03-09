import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const ZoomInAnimation = keyframes`
  from {
     opacity: 0;
     transform: scale3d(.3, .3, .3);
   }
   50% {
     opacity: 1;
   }
`;

const ZoomIn = transition.div`
  &:enter {
    animation: ${ZoomInAnimation} 1s forwards;
  }
`;

ZoomIn.propTypes = {};

export default ZoomIn;
