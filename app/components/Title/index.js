/**
 *
 * Title
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FadeIn, SlideInDown } from 'components/Animations';
import styled from 'styled-components';

const Title = styled.h4`
  font-size: 2rem;
  margin: 15px 0;
`;

class AnimatedTitle extends React.PureComponent {
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
          <Title>{children}</Title>
        </SlideInDown>
      </FadeIn>
    );
  }
}

AnimatedTitle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string]),
};

export default AnimatedTitle;
