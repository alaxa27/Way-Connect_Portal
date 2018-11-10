/**
 *
 * Fidelity
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import { OpenCard, LockedCard } from 'components/PromotionCard';
import EstablishmentName from './EstablishmentName';
import FidelityWrapper from './FidelityWrapper';

/* eslint-disable react/prefer-stateless-function */
class Fidelity extends React.Component {
  render() {
    return (
      <FidelityWrapper>
        <Title>Fidélité</Title>
        <SubTitle>
          {'Bénéficiez doffres fidélité auprès de'}
          <EstablishmentName> 180 DEGRES </EstablishmentName>
          {'ou accédez directement à Internet.'}
        </SubTitle>
        <LockedCard index={1} offer="Café Maschiatto double Java" />
        <OpenCard
          index={1}
          visitCount={2}
          visitTotal={10}
          offer="Café Maschiatto double Java"
        />
        <OpenCard
          index={1}
          visitCount={2}
          visitTotal={10}
          offer="Café Maschiatto double Java"
        />
        <OpenCard
          index={1}
          visitCount={2}
          visitTotal={10}
          offer="Café Maschiatto double Java"
        />
        <OpenCard
          index={1}
          visitCount={2}
          visitTotal={10}
          offer="Café Maschiatto double Java"
        />
      </FidelityWrapper>
    );
  }
}

Fidelity.propTypes = {};

export default Fidelity;
