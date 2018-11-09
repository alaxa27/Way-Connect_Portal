import styled from 'styled-components';

const QuestionWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  > :last-child {
    flex-grow: 1;
    margin-top: 8vh;
    overflow-y: auto;
  }
`;

export default QuestionWrapper;
