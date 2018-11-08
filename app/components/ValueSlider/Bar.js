import styled from 'styled-components';

const Bar = styled.div`
  height: ${props => (props.selected ? '5px' : '9px')};
  flex-grow: ${props => props.width};
  background: ${props => (props.transparent ? 'transparent' : '#4d4d4d')};
`;

export default Bar;
