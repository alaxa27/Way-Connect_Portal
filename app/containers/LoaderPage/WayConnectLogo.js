import styled, { keyframes } from 'styled-components';

const InfiniteSpinning = keyframes`
0% {
  transform: rotate(0deg);
}
94% {
  transform: rotate(360deg);
}
95% {
  transform: scale(1.1)
}
100% {
  transform: scale(1);
}
`;

const WayConnectLogo = styled.img`
  height: 130px;
  width: 130px;
  animation: ${InfiniteSpinning} 2s ease-in-out infinite;
}
`;

export default WayConnectLogo;
