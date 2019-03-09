import styled from 'styled-components';
import PropTypes from 'prop-types';

const Bar = styled.div.attrs(() => ({
  style: ({ flexGrow }) => ({
    flexGrow,
  }),
}))`
  margin-top: -3px;
  height: ${props => (props.selected ? '4px' : '10px')};
  background: ${props => (props.transparent ? 'transparent' : '#4d4d4d')};
`;

Bar.defaultProps = {
  transparent: false,
};

Bar.propTypes = {
  transparent: PropTypes.bool,
};

export default Bar;
