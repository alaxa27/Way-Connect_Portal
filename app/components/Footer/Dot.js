import styled from 'styled-components';

const Dot = styled.div`
  width: ${props => (props.active ? '12px' : '9px')};
  height: ${props => (props.active ? '12px' : '9px')};
  border-radius: 8rem;
  background: ${props => {
    if (props.passed) {
      return '#808080';
    }
    if (props.active) {
      return 'linear-gradient(to top right, #F1612C, #F58921)';
    }
    return '#4D4D4D';
  }};
  margin: 6px;
`;

export default Dot;
