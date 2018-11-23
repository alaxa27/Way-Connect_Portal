/*
 *
 * LoaderPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ESTABLISHMENT,
  GET_ESTABLISHMENT_SUCCESS,
  GET_ESTABLISHMENT_ERROR,
  POST_CONNECTION,
  POST_CONNECTION_SUCCESS,
  POST_CONNECTION_ERROR,
  GET_PROMOTION_LEVELS,
  GET_PROMOTION_LEVELS_SUCCESS,
  GET_PROMOTION_LEVELS_ERROR,
  RETRIEVE_DISCOUNT,
  RETRIEVE_DISCOUNT_SUCCESS,
  RETRIEVE_DISCOUNT_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadEstablishment() {
  return {
    type: GET_ESTABLISHMENT,
  };
}

export function establishmentLoaded(name, picture) {
  return {
    type: GET_ESTABLISHMENT_SUCCESS,
    name,
    picture,
  };
}

export function establishmentLoadingError(error) {
  return {
    type: GET_ESTABLISHMENT_ERROR,
    error,
  };
}

export function postConnection() {
  return {
    type: POST_CONNECTION,
  };
}

export function connectionPosted(connection) {
  return {
    type: POST_CONNECTION_SUCCESS,
    communication: connection.communication,
  };
}

export function connectionPostingError() {
  return {
    type: POST_CONNECTION_ERROR,
  };
}

export function loadPromotionLevels() {
  return {
    type: GET_PROMOTION_LEVELS,
  };
}

export function promotionLevelsLoaded(promotionLevels) {
  const bannerLevelIndex = promotionLevels.findIndex(
    level => level.rank === 101,
  );
  let bannerText = '';
  if (bannerLevelIndex > -1) {
    bannerText = promotionLevels[bannerLevelIndex].text;
    promotionLevels.splice(bannerLevelIndex, 1);
  }
  return {
    type: GET_PROMOTION_LEVELS_SUCCESS,
    promotionLevels,
    bannerText,
  };
}

export function promotionLevelsLoadingError() {
  return {
    type: GET_PROMOTION_LEVELS_ERROR,
  };
}

export function loadDiscount() {
  return {
    type: RETRIEVE_DISCOUNT,
  };
}

export function discountLoaded(discount) {
  return {
    type: RETRIEVE_DISCOUNT_SUCCESS,
    discount,
  };
}

export function discountLoadingError() {
  return {
    type: RETRIEVE_DISCOUNT_ERROR,
  };
}
