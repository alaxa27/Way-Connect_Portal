/**
 *
 * Fidelity
 *
 */

import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
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
  renderPromotionCard(levels, currentLevel) {
    return _.map(levels, (level, key) => {
      if (level.rank < currentLevel.current_rank) {
        return (
          <OpenCard
            key={key}
            {...level}
            currentViews={level.required_views}
            requiredViews={level.required_views}
          />
        );
      }
      if (level.rank === currentLevel.current_rank) {
        if (currentLevel.current_views === level.required_views) {
          return (
            <LockedCard
              key={key}
              {...level}
              active
              onClick={this.props.onActiveClick}
              requiredViews={level.required_views}
            />
          );
        }
        return (
          <OpenCard
            key={key}
            {...level}
            currentViews={currentLevel.current_views}
            requiredViews={level.required_views}
          />
        );
      }
      return (
        <LockedCard key={key} {...level} requiredViews={level.required_views} />
      );
    });
  }

  render() {
    const { levels } = this.props;
    const establishmentName = this.props.establishment_name;

    return (
      <FidelityWrapper>
        <Title>Fidélité</Title>
        <SubTitle>
          {'Bénéficiez doffres fidélité auprès de'}
          <EstablishmentName> {establishmentName} </EstablishmentName>
          {'ou accédez directement à Internet.'}
        </SubTitle>
        {this.renderPromotionCard(levels, this.props.current_level)}
      </FidelityWrapper>
    );
  }
}

Fidelity.propTypes = {
  establishment_name: PropTypes.string.isRequired,
  levels: PropTypes.array.isRequired,
  onActiveClick: PropTypes.func.isRequired,
};

export default Fidelity;
