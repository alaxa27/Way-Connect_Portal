import React from 'react';
import { mount } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import SubTitle from 'components/SubTitle';
import banner from 'images/banner.png';

import BannerCard from '../BannerCard';
import Banner from '../index';

describe('<Banner />', () => {
  const renderComponent = (props = {}) => mount(<Banner {...props} />);
  const passedProps = {
    text: 'foo',
    image: 'images/test.png',
  };
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = renderComponent(passedProps);
  });
  it('should render the right SubTitle', () => {
    const subTitleComponent = renderedComponent.find(SubTitle);
    expect(subTitleComponent.prop('children')).toEqual(passedProps.text);
  });

  it('should display the correct image', () => {
    const bannerCardComponent = renderedComponent.find(BannerCard);
    expect(bannerCardComponent.prop('src')).toBe(banner);
  });
});
