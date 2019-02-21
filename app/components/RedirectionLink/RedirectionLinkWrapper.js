import styled from 'styled-components';

const PhoneNumberWrapper = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.colors.orange};
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

export default PhoneNumberWrapper;
