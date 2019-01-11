import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    color: #FFFFFF
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }

  #app {
    background-color: ${props => (props.videoScreen ? '#000000' : '#313131')};
    height: 100%;
    width: 100%;
    min-height: 100%;
    min-width: 100%;
    padding: 35px;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
