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
      return props.theme.colors.orange;
    }
    return props.theme.colors.inactive;
  }};
  border-radius: 45px;
  color: ${props =>
    props.transparent ? props.theme.colors.inactive : props.theme.colors};
`;

ArrowWrapper.defaultProps = {
  transparent: false,
  active: false,
};

ArrowWrapper.propTypes = {
  transparent: PropTypes.bool,
  active: PropTypes.bool,
};

export default ArrowWrapper;
