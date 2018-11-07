import styled from 'styled-components';

const Choice = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-top: 5px;
  color: ${props => (props.active ? '#CCCCCC' : '#666666')};
`;

export default Choice;
