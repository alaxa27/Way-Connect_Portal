import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Title from './Title';
import PromotionCardWrapper from './PromotionCardWrapper';

const Label = styled.div`
  color: #ffffff;
  font-size: ${props => (props.big ? '1.75rem' : 'inherit')};
  font-weight: ${props => (props.big ? 'bold' : 'inherit')};
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  margin: 10px 0;
  padding-bottom: 4px;
`;

const OpenCard = props => {
  const { rank, currentViews, requiredViews, offer } = props;

  return (
    <PromotionCardWrapper>
      <Title>
        Promotion n°
        {rank}
      </Title>
      <Info>
        Visite
        <Label big>
          {currentViews}/{requiredViews}
        </Label>
      </Info>
      <Info>
        Offre
        <Label>{offer}</Label>
      </Info>
    </PromotionCardWrapper>
  );
};

OpenCard.propTypes = {
  rank: PropTypes.number.isRequired,
  currentViews: PropTypes.number.isRequired,
  requiredViews: PropTypes.number.isRequired,
  offer: PropTypes.string.isRequired,
};

export default OpenCard;
