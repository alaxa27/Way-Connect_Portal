import styled, { keyframes } from 'styled-components';

const InfiniteSpinning = keyframes`
0% {
  transform: rotate(0deg);
}
50% {
  transform: rotate(180deg);
}
100% {
  transform: rotate(360deg);
}
`;

const WayConnectLogo = styled.img`
  height: 130px;
  width: 130px;
  animation: ${InfiniteSpinning} 2s ease-in-out infinite;
}
`;

export default WayConnectLogo;
