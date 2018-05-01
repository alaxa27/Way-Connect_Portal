import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

class Login extends Component {
  render() {

    return (<div className="login">
      <Row>
        <Col>
          <img src="assets/logo.png" className="logo"/>
        </Col>
      </Row>
      <div className="buttons align-bottom">
        <Row>
          <Col>
            <Button className="btn-facebook">
              <i className="fa fa-facebook-square"></i>
                {"   "} Continue with facebook
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <NavLink to="/register" className="no-facebook">
              I don't have Facebook
            </NavLink>
          </Col>
        </Row>
      </div>
    </div>);
  }
}

export default Login;
