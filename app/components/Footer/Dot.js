import styled from 'styled-components';

const Dot = styled.div`
  width: ${props => (props.active ? '12px' : '9px')};
  height: ${props => (props.active ? '12px' : '9px')};
  border-radius: 8rem;
  background: ${props => {
    if (props.passed) {
      return props.theme.colors.active;
    }
    if (props.active) {
      return props.theme.colors.orange;
    }
    return props.theme.colors.inactive;
  }};
  margin: 6px;
`;

export default Dot;
