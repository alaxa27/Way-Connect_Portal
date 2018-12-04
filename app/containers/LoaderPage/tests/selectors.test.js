import { fromJS } from 'immutable';
import {
  selectLoaderPageDomain,
  makeSelectEstablishmentName,
  makeSelectCurrentFidelityLevel,
  makeSelectConnection,
} from '../selectors';

describe('selectLoaderPageDomain', () => {
  it('should select the loader page domain', () => {
    const loaderPageState = fromJS({
      data: {},
    });
    const mockedState = fromJS({
      loaderPage: loaderPageState,
    });
    expect(selectLoaderPageDomain(mockedState)).toEqual(loaderPageState);
  });
});

describe('makeSelectEstablishmentName', () => {
  const establishmentNameSelector = makeSelectEstablishmentName();
  it('should select the establishmentName', () => {
    const establishmentName = 'establishment1';
    const mockedState = fromJS({
      loaderPage: {
        establishmentName,
      },
    });
    expect(establishmentNameSelector(mockedState)).toEqual(establishmentName);
  });
});

describe('makeSelectConnection', () => {
  const connectionSelector = makeSelectConnection();
  it('should select connection', () => {
    const connection = [
      {
        type: 'F',
        foo: {
          bar: 'baz',
        },
      },
    ];
    const mockedState = fromJS({
      loaderPage: {
        connection,
      },
    });
    expect(connectionSelector(mockedState)).toEqual(fromJS(connection));
  });
});

describe('makeSelectCurrentFidelityLevel', () => {
  const currentFidelityLevelSelector = makeSelectCurrentFidelityLevel();
  it('should select the currentFidelityLevel', () => {
    const currentFidelityLevel = fromJS({
      data: true,
    });
    const mockedState = fromJS({
      loaderPage: {
        currentFidelityLevel,
      },
    });
    expect(currentFidelityLevelSelector(mockedState)).toEqual(
      currentFidelityLevel,
    );
  });
});
