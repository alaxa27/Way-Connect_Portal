import styled from 'styled-components';

const Title = styled.div`
  font-size: ${props => (props.locked ? '1.25rem' : '1rem')};
  font-weight: bold;
`;

export default Title;
