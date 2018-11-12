import styled from 'styled-components';

const PromotionCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => (props.locked ? 'center' : 'inherit')};
  margin: 15px 0;
  padding: ${props => (props.locked ? '50px' : '15px')};
  background: #3a3a3a;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
  font-weight: lighter;
  color: ${props => (props.locked && !props.active ? '#666666' : '#cccccc')};
`;

export default PromotionCardWrapper;
