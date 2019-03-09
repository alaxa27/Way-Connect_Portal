import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';
import transition from 'styled-transition-group';

const FadeIn = transition.div`
  &:enter { 
    opacity: 0.01;
  }
  &:enter-active {
    opacity: 1;
    transition: opacity 1s ease-in;
  }
`;
const FadeInTimeout = props => (
  <FadeIn {...props} timeout={1000} style={{ opacity: props.in ? null : '0' }}>
    {props.children}
  </FadeIn>
);

export default FadeInTimeout;
