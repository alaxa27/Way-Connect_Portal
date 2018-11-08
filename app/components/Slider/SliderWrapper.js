import styled from 'styled-components';

const SliderWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: start;
  align-items: center;
  background-color: #000000;
  height: 55px;
  padding: ${props => props.padding}px;
  border-radius: 55px;
  color: #666666;
`;

export default SliderWrapper;
