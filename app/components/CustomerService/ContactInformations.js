import styled from 'styled-components';

const ContactInformations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 30px;
  padding-bottom: 30px;
  background-color: #262626;
  font-size: 0.75rem;
`;

const Text = styled.span`
  font-weight: lighter;
  margin-bottom: 4px;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
`;

export default ContactInformations;
export { Text, Title };
