import { createGlobalStyle } from 'styled-components';

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
