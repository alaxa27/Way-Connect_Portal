import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PromotionCardWrapper from './PromotionCardWrapper';

const Title = styled.div`
  font-size: 1rem;
`;

const Label = styled.div`
  color: #ffffff;
  border-bottom
`;

const Info = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const LockedCard = props => {
  const { index, visitCount, visitTotal, offer } = props;
  return (
    <PromotionCardWrapper>
      <Title>
        Promotion n°
        {index}
      </Title>
      <Info>
        Visite
        <Label>
          {visitCount}/{visitTotal}
        </Label>
      </Info>
      <Info>
        Offre
        <Label>{offer}</Label>
      </Info>
    </PromotionCardWrapper>
  );
};

LockedCard.propTypes = {
  index: PropTypes.number.isRequired,
  visitCount: PropTypes.number.isRequired,
  visitTotal: PropTypes.number.isRequired,
  offer: PropTypes.string.isRequired,
};

export default LockedCard;
