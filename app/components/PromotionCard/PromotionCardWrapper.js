import styled from 'styled-components';

const PromotionCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => (props.locked ? 'center' : 'inherit')};
  background: #3a3a3a;
  font-size: 0.75rem;
  font-weight: lighter;
  color: #cccccc;
  margin: 15px 0;
  padding: ${props => (props.locked ? '50px' : '15px')};
`;

export default PromotionCardWrapper;
