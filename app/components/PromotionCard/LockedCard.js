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
  color: #cccccc;
  font-weight: bold;
`;

const Text = styled.p`
  text-align: center;
`;

const LockedCard = props => {
  const { rank, offer, active } = props;
  const activeText = `Tapez ici pour obtenir l'offre suivante`;
  const notActiveText = `Vous devez finir le palier précédent pour accéder à cette offre`;

  return (
    <PromotionCardWrapper locked active={active}>
      <Lock src={active ? lockOpen : lockClose} />
      <Title locked>
        Promotion n°
        {rank}
      </Title>
      <Text>{active ? activeText : notActiveText}</Text>
      <Offer>{offer}</Offer>
    </PromotionCardWrapper>
  );
};

LockedCard.defaultProps = {
  active: false,
};

LockedCard.propTypes = {
  rank: PropTypes.number.isRequired,
  offer: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default LockedCard;
