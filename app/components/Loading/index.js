/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import LoadingWrapper from './LoadingWrapper';
// import styled from 'styled-components';

function Loading(props) {
  return (
    <LoadingWrapper>
      <Loader type="Rings" color={props.theme.colors.active} {...props} />
    </LoadingWrapper>
  );
}

Loading.defaultProps = {
  height: '100',
  width: '100',
};

Loading.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Loading;
