import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import lockOpen from 'images/lock_open.png';
import lockClose from 'images/lock_close.png';

import Title from './Title';
import PromotionCardWrapper from './PromotionCardWrapper';

const Lock = styled.img`
  margin-bottom: 10px;
`;

const Offer = styled.div`
  color: #dbdbdb;
  font-weight: bold;
`;

const Text = styled.p`
  text-align: center;
`;

const LockedCard = props => {
  const { rank, text, active, onClick } = props;
  const activeText = `Tapez ici pour obtenir l'offre suivante`;
  const notActiveText = `Vous devez finir le palier précédent pour accéder à cette offre`;

  return (
    <PromotionCardWrapper locked active={active} onClick={onClick}>
      <Lock src={active ? lockOpen : lockClose} />
      <Title locked>
        Promotion n°
        {rank}
      </Title>
      <Text>{active ? activeText : notActiveText}</Text>
      <Offer>{text}</Offer>
    </PromotionCardWrapper>
  );
};

LockedCard.defaultProps = {
  active: false,
  onClick: () => {},
};

LockedCard.propTypes = {
  rank: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LockedCard;
