/**
 *
 * SubTitle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FadeIn, SlideInDown } from 'components/Animations';

const SubTitle = styled.p`
  color: ${props => props.theme.colors.active};
  font-size: 1.25rem;
  font-weight: lighter;
  margin: 0;
`;

class AnimatedSubTitle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { mounted } = this.state;
    const { children } = this.props;
    return (
      <FadeIn in={mounted}>
        <SlideInDown in={mounted} timeout={1000}>
          <SubTitle>{children}</SubTitle>
        </SlideInDown>
      </FadeIn>
    );
  }
}

AnimatedSubTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string]),
};

export default AnimatedSubTitle;
