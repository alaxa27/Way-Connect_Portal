import React from 'react';
import styled from 'styled-components';

const StyledCheckMark = styled.div`
  width: 8px;
  height: 8px;
  border-radius: ${props => (!props.multiple ? '8px' : 'none')};
  background-color: #4d4d4d;
`;

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: ${props => (props.active ? '#cccccc' : '#666666')};
  border-radius: ${props => (!props.multiple ? '16px' : 'none')};
`;
const ChoiceInput = props => (
  <StyledInput {...props}>
    {props.active ? <StyledCheckMark {...props} /> : null}
  </StyledInput>
);

export default ChoiceInput;
