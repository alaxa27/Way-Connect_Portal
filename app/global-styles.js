import { createGlobalStyle, css, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    color: #FFFFFF;
  }

  body {
    background-color: #000000;
    font-family: 'Roboto', sans-serif;
    min-width: 100%;
    display: flex;
    justify-content: center;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }

  #app {
    height: 100%;
    width: 100%;
    background-color: ${props => (props.videoScreen ? '#000000' : '#1A1A1A')};
    min-height: 100%;
    max-width: 500px;
    padding: 35px;
    overflow-x: hidden;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

const theme = {
  transitions: {
    fadeIn: css`
      &:enter {
        opacity: 0.01;
      }
      &:enter-active {
        opacity: 1;
        transition: opacity 500ms ease-in;
      }
    `,
    slideInLeft: keyframes`
      from {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
      }

      to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
    `,
    slideOutLeft: keyframes`
      from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      to {
        visibility: hidden;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
      }
    `,
    bounceIn: keyframes`
      from, 20%, 40%, 60%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      }
      0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
      }
      20% {
        transform: scale3d(1.1, 1.1, 1.1);
      }
      40% {
        transform: scale3d(.9, .9, .9);
      }
      60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
      }
      80% {
        transform: scale3d(.97, .97, .97);
      }
      to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    `,
  },
  colors: {
    text: '#ffffff',
    active: '#a5a5a5',
    inactive: '#666666',
    orange: '#fbb03b',
  },
};

export default GlobalStyle;
export { theme };
