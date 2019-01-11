import React from 'react';
import styled from 'styled-components';

import Chrome from 'images/chrome.png';
import Facebook from 'images/facebook.png';
import Instagram from 'images/instagram.png';
import Phone from 'images/phone.png';

const Icon = styled.img`
  margin-bottom: 4px;
  margin-right: 4px;
`;

const RedirectionLinkIcon = props => {
  switch (props.type) {
    case 'tel':
      return <Icon src={Phone} />;
    case 'instagram':
      return <Icon src={Instagram} />;
    case 'facebook':
      return <Icon src={Facebook} />;
    case 'web':
      return <Icon src={Chrome} />;
    default:
      return null;
  }
};

export default RedirectionLinkIcon;
