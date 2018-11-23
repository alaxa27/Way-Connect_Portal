/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

// import { GET_ESTABLISHMENT } from '../constants';

import { establishmentLoaded, establishmentLoadingError } from '../actions';
import { getEstablishmentEffect } from '../saga';

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
    };
    const putDescriptor = getEstablishmentGenerator.next({ data }).value;
    // console.log(putDescriptor)
    expect(putDescriptor).toEqual(put(establishmentLoaded(data.name)));
  });

  it('should dispatch the establishmentLoadingError action requests fails', () => {
    const response = new Error('Some error');
    const putDescriptor = getEstablishmentGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(establishmentLoadingError(response)));
  });
});
// describe('loaderPageSaga Saga', () => {
//   const loaderPageSaga = loaderPage();

//   it('should start task to watch for GET_ESTABLISHMENT action', () => {
//     const takeLatestDescriptor = loaderPageSaga.next().value;
//     expect(takeLatestDescriptor).toEqual(
//       takeLatest(GET_ESTABLISHMENT, getEstablishmentEffect),
//     );
//   });
// });
