/**
 * Test sagas
 */

import { call, fork, put, take } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import sinon from 'sinon';
import ReactGA from 'react-ga';

import { establishmentLoaded, establishmentLoadingError } from '../actions';
import loaderPage, {
  getEstablishmentEffect,
  fetchAllEffect,
  getDiscountEffect,
  postConnectionEffect,
} from '../saga';
import { POST_CONNECTION_SUCCESS } from '../constants';

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
    const expectedResult = call(fetchAllEffect);
    expect(callDescriptor).toEqual(expectedResult);
  });
  describe('fetchAllEffect', () => {
    const fetchAllEffectGen = cloneableGenerator(fetchAllEffect)();
    sinon.stub(ReactGA);
    it('should fork getEstablishmentEffect', () => {
      const descriptor = fetchAllEffectGen.next().value;
      const expectedResult = fork(getEstablishmentEffect);
      expect(descriptor).toEqual(expectedResult);
    });
    describe('getEstablishmentEffect', () => {
      // const getEstablishmentEffectGen = cloneableGenerator(
      // getEstablishmentEffect,
      // )();
      it('should call getEstablishmentRequest', () => {});
      it('should put establishmentLoaded if request is successful', () => {});
      it('should put establishmentLoadingError if request failed', () => {});
    });
    it('should fork getDiscountEffect', () => {
      const descriptor = fetchAllEffectGen.next().value;
      const expectedResult = fork(getDiscountEffect);
      expect(descriptor).toEqual(expectedResult);
    });
    describe('getDiscountEffect', () => {
      it('should call getDiscountRequest', () => {});
      it('should put discountLoaded if request is successful', () => {});
      it('should put discountLoadingError if request failed', () => {});
    });
    it('should fork postConnectionEffect', () => {
      const descriptor = fetchAllEffectGen.next().value;
      const expectedResult = fork(postConnectionEffect);
      expect(descriptor).toEqual(expectedResult);
    });
    describe('postConnectionEffect', () => {
      it('should call postConnectionRequest', () => {});
      it('should put connectionPosted if request is successful', () => {});
      it('should put connectionPostingError if request failed', () => {});
    });
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
