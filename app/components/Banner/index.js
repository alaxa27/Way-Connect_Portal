/**
 *
 * Banner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import banner from 'images/banner.png';
import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import BannerWrapper from './BannerWrapper';
import BannerCard from './BannerCard';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Banner extends React.Component {
  render() {
    const { text, image } = this.props;
    console.log(image);
    return (
      <BannerWrapper>
        <Title>Terminé</Title>
        <SubTitle>{text}</SubTitle>
        <BannerCard src={banner} />
      </BannerWrapper>
    );
  }
}

Banner.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Banner;
