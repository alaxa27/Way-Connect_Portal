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
  renderPromotionCard(discounts, currentLevel) {
    return _.map(discounts, (discount, key) => {
      if (discount.rank < currentLevel.rank) {
        return (
          <OpenCard
            key={key}
            {...discount}
            currentViews={discount.required_views}
            requiredViews={discount.required_views}
          />
        );
      }
      if (discount.rank === currentLevel.rank) {
        if (currentLevel.current_views === discount.required_views) {
          return (
            <LockedCard
              key={key}
              {...discount}
              active
              onClick={this.props.onActiveClick}
              requiredViews={discount.required_views}
            />
          );
        }
        return (
          <OpenCard
            key={key}
            {...discount}
            currentViews={currentLevel.current_views}
            requiredViews={discount.required_views}
          />
        );
      }
      return (
        <LockedCard
          key={key}
          {...discount}
          requiredViews={discount.required_views}
        />
      );
    });
  }

  render() {
    const { discounts } = this.props;
    const establishmentName = this.props.establishment_name;

    return (
      <FidelityWrapper>
        <Title>Fidélité</Title>
        <SubTitle>
          {'Bénéficiez doffres fidélité auprès de'}
          <EstablishmentName> {establishmentName} </EstablishmentName>
          {'ou accédez directement à Internet.'}
        </SubTitle>
        {this.renderPromotionCard(discounts, this.props.current_level)}
      </FidelityWrapper>
    );
  }
}

Fidelity.propTypes = {
  establishment_name: PropTypes.string.isRequired,
  discounts: PropTypes.array.isRequired,
  onActiveClick: PropTypes.func.isRequired,
};

export default Fidelity;
