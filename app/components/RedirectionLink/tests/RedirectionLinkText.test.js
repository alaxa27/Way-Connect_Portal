import React from 'react';
import { shallow } from 'enzyme';

import RedirectionLinkText from '../RedirectionLinkText';

describe('<RedirectionLinkText />', () => {
  it('should have a displayText method working properly:', () => {
    const redirection = {
      type: 'tel',
    };
    const wrapper = shallow(<RedirectionLinkText {...redirection} />);

    const expectedResponse = 'Contactez nous';

    expect(wrapper.text()).toEqual(expectedResponse);
  });
  it('should return null if type is null', () => {
    const redirection = {
      type: null,
    };
    const wrapper = shallow(<RedirectionLinkText {...redirection} />);

    const expectedResponse = '';

    expect(wrapper.text()).toEqual(expectedResponse);
  });
});
