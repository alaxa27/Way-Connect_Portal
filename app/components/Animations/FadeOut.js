import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const FadeOut = transition.div`
  &:exit { 
    opacity: 1;
  }
  &:exit-active {
    opacity: 0.01;
    transition: opacity 1s ease-out;
  }
`;
const FadeOutTimeout = props => (
  <FadeOut {...props} timeout={1000}>
    {props.children}
  </FadeOut>
);

export default FadeOutTimeout;
