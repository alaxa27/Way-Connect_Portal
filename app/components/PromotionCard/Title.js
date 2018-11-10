import styled from 'styled-components';

const Title = styled.div`
  font-size: ${props => (props.active ? '1.25rem' : '1rem')};
  font-weight: bold;
`;

export default Title;
