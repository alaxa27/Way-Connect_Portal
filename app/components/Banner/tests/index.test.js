import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
// import { enzymeFind } from 'styled-components/test-utils';

import SubTitle from 'components/SubTitle';
import banner from 'images/banner.png';
import { theme } from '../../../global-styles';

import BannerCard from '../BannerCard';
import Banner from '../index';

describe('<Banner />', () => {
  const renderComponent = (props = {}) =>
    mount(<Banner {...props} theme={theme} />);
  const passedProps = {
    text: 'foo',
    picture: banner,
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
    expect(bannerCardComponent.find('img').prop('src')).toEqual(banner);
  });
});
