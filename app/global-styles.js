import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    color: #FFFFFF;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }

  #app {
    background-color: ${props => (props.videoScreen ? '#000000' : '#1A1A1A')};
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

const theme = {
  colors: {
    text: '#ffffff',
    active: '#a5a5a5',
    inactive: '#666666',
    orange: '#fbb03b',
  },
};

export default GlobalStyle;
export { theme };
