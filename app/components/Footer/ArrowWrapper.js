import styled from 'styled-components';
import PropTypes from 'prop-types';

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: ${props => {
    if (props.transparent) {
      return 'transparent';
    }
    if (props.active) {
      return 'linear-gradient(to top right, #F18F10, #F37327)';
    }
    return '#6D6D6D';
  }};
  border-radius: 45px;
  color: ${props => (props.transparent ? '#666666' : '#313131')};
`;

ArrowWrapper.defaultProps = {
  transparent: false,
  active: false,
};

ArrowWrapper.propTypes = {
  transparent: PropTypes.Boolean,
  active: PropTypes.Boolean,
};

export default ArrowWrapper;
