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
  const removeAndGetText = (rank, levelsArray) => {
    const index = levelsArray.findIndex(level => level.rank === rank);
    if (index > -1) {
      const res = levelsArray[index].text;
      levelsArray.splice(index, 1);
      return res;
    }
    return '';
  };
  const bannerText = removeAndGetText(101, promotionLevels);
  const claimPhoneNumber = removeAndGetText(102, promotionLevels);
  return {
    type: GET_PROMOTION_LEVELS_SUCCESS,
    promotionLevels,
    bannerText,
    claimPhoneNumber,
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
