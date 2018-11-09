import styled from 'styled-components';
import PropTypes from 'prop-types';

const Bar = styled.div`
  height: ${props => (props.selected ? '5px' : '9px')};
  flex-grow: ${props => props.width};
  background: ${props => (props.transparent ? 'transparent' : '#4d4d4d')};
`;

Bar.defaultProps = {
  transparent: false,
};

Bar.propTypes = {
  width: PropTypes.number.isRequired,
  transparent: PropTypes.bool,
};

export default Bar;
