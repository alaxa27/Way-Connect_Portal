import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

class Login extends Component {
  render() {

    return (<div className="login">
      <img src="assets/logo.png" className="logo"/>
      <div>
        <Button className="btn-facebook">
          <i className="fa fa-facebook-square"></i>
          {"   "}
          Continue with facebook
        </Button>
        <NavLink to="/register" className="no-facebook">
          {"I don't have Facebook"}
        </NavLink>
      </div>
    </div>);
  }
}

export default Login;
