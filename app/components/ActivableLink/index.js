/**
 *
 * ActivableLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
const ActivableLink = props => {
  if (props.active) {
    const derivedProps = { ...props };
    delete derivedProps.active;
    return <Link {...props}>{props.children}</Link>;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

ActivableLink.defaultProps = {
  active: false,
};

ActivableLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default ActivableLink;
