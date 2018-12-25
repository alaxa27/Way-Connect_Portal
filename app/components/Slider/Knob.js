import styled from 'styled-components';

const Knob = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background: ${props =>
    props.active ? 'linear-gradient(to top, #F18F10, #F37327)' : '#333333'};
  color: ${props => (props.active ? '#000000' : '#999999')};
  transition: ${props => (props.dropped ? '0.5s ease-out' : 'none')};
`;

export default Knob;
