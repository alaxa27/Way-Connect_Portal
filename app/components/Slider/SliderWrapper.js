import styled from 'styled-components';

const SliderWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 499px) {
    flex: 1;
  }
  @media screen and (min-width: 500px) {
    width: 300px;
  }

  justify-content: start;
  align-items: center;
  background-color: #000000;
  height: 55px;
  padding: ${props => props.padding}px;
  border-radius: 55px;
  color: #666666;
`;

export default SliderWrapper;
