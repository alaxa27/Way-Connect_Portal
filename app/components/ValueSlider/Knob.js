import styled from 'styled-components';

const Knob = styled.div`
  position: fixed;
  margin-left: calc(${props => props.value}px - 8px);
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.inactive};
`;

export default Knob;
