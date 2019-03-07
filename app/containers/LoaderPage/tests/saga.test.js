/**
 * Test sagas
 */

import { all, call, put, take } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import sinon from 'sinon';
import ReactGA from 'react-ga';

import { establishmentLoaded, establishmentLoadingError } from '../actions';
import loaderPage, { getEstablishmentEffect, fetchAllEffect } from '../saga';
import {
  POST_CONNECTION_SUCCESS,
  LOADERPAGE_ANIMATIONS_SUCCESS,
} from '../constants';

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
  const loaderPageSagaGen = cloneableGenerator(loaderPage)();

  it('should call fetchAllEffect', () => {
    const callDescriptor = loaderPageSagaGen.next().value;
    const expectedResult = all([
      take(LOADERPAGE_ANIMATIONS_SUCCESS),
      call(fetchAllEffect),
    ]);
    expect(callDescriptor).toEqual(expectedResult);
  });
  describe('fetchAllEffect', () => {
    const fetchAllEffectGen = cloneableGenerator(fetchAllEffect)();
    sinon.stub(ReactGA);
    fetchAllEffectGen.next();
    it('should wait for POST_CONNECTION_SUCCESS', () => {
      const descriptor = fetchAllEffectGen.next().value;
      const expectedResult = take(POST_CONNECTION_SUCCESS);
      expect(descriptor).toEqual(expectedResult);
    });
    it('should end fetchAllEffect', () => {
      const effectState = fetchAllEffectGen.next().done;
      const expectedResult = true;
      expect(effectState).toEqual(expectedResult);
    });
  });
  it('should redirect to journeys first item', () => {});
});
