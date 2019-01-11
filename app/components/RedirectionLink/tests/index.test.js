import React from 'react';
import { shallow } from 'enzyme';

import RedirectionLink from '../index';

describe('<RedirectionLink />', () => {
  let props;

  beforeEach(() => {
    props = {
      redirection: {
        type: 'test',
      },
    };
  });

  it('should have a displayText method working properly:', () => {
    const wrapper = shallow(<RedirectionLink {...props} />).instance();

    const input = 'tel';
    const expectedResponse = 'Contactez nous';

    expect(wrapper.displayText(input)).toEqual(expectedResponse);
  });
});
