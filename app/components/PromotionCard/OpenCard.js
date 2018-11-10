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
  const { index, visitCount, visitTotal, offer } = props;

  return (
    <PromotionCardWrapper>
      <Title>
        Promotion n°
        {index}
      </Title>
      <Info>
        Visite
        <Label big>
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

OpenCard.propTypes = {
  index: PropTypes.number.isRequired,
  visitCount: PropTypes.number.isRequired,
  visitTotal: PropTypes.number.isRequired,
  offer: PropTypes.string.isRequired,
};

export default OpenCard;
