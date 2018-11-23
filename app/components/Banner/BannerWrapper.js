import styled from 'styled-components';

const BannerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  > :last-child {
    margin-top: 8vh;
  }
`;

export default BannerWrapper;
