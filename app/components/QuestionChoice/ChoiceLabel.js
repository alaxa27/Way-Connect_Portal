import styled from 'styled-components';

const ChoiceLabel = styled.label`
  flex: 1;
  font-size: 0.8rem;
  font-weight: lighter;
  margin-left: 20px;
  color: ${props => (props.active ? '#CCCCCC' : '#666666')};
  border-bottom-style: solid;
  border-bottom-width: ${props => (props.active ? '2px' : '1px')};
  border-color: ${props => (props.active ? '#CCCCCC' : '#666666')};
`;

export default ChoiceLabel;
