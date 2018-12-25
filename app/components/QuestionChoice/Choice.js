import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledChoice = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-top: 5px;
  cursor: pointer;
  color: ${props => (props.active ? '#dbdbdb' : '#999999')};
`;

const Choice = props => (
  <StyledChoice
    onClick={() => {
      props.onChoiceClick(props.id);
    }}
  >
    {props.children}
  </StyledChoice>
);

Choice.propTypes = {
  children: PropTypes.array,
  id: PropTypes.number.isRequired,
  onChoiceClick: PropTypes.func.isRequired,
};

export default Choice;
