// import { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const FadeIn = transition.div.attrs({
  timeout: 1000,
})`
  opacity: 0;
  &:enter { 
    opacity: 0.01;
  }
  &:enter-active {
    opacity: 1;
    transition: opacity 1s ease-in;
  }
`;

FadeIn.propTypes = {};

export default FadeIn;
