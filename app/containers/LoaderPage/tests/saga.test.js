/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';

import { GET_ESTABLISHMENT } from '../constants';

import { establishmentLoaded, establishmentLoadingError } from '../actions';
import loaderPage, { getEstablishmentEffect, fetchAllEffect } from '../saga';

// const generator = loaderPageSaga();

describe('getEstablishment effect', () => {
  let getEstablishmentGenerator;

  beforeEach(() => {
    getEstablishmentGenerator = getEstablishmentEffect();

    const callDescriptor = getEstablishmentGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the establishmentLoaded action if the request is successful', () => {
    const data = {
      name: 'foo',
      picture: 'bar',
    };
    const putDescriptor = getEstablishmentGenerator.next({ data }).value;
    // console.log(putDescriptor)
    expect(putDescriptor).toEqual(
      put(establishmentLoaded(data.name, data.picture)),
    );
  });

  it('should dispatch the establishmentLoadingError action requests fails', () => {
    const response = new Error('Some error');
    const putDescriptor = getEstablishmentGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(establishmentLoadingError(response)));
  });
});

describe('loaderPageSaga Saga', () => {
  const loaderPageSaga = loaderPage();

  it('should start task to watch for GET_ESTABLISHMENT action', () => {
    const takeLatestDescriptor = loaderPageSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_ESTABLISHMENT, fetchAllEffect),
    );
  });
});
