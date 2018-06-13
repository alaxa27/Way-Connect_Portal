import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Button, Row, Col} from "reactstrap";
import ReduxBlockUi from "react-block-ui/redux";
import {FacebookLogin} from "react-facebook-login-component";

import {postRegisterForm} from "../../actions/registerActions";
import {NATIONALITY} from "../../data/status";

@connect((store) => {
  let registerStore = store.register;
  return {posting: registerStore.posting, posted: registerStore.posted};
})

class Login extends Component {
  callbackFacebookLogin(response) {

    const age = Math.abs(new Date(Date.now() - new Date(response.birthday)).getUTCFullYear() - 1970);
    const gender = (
      response.gender === "male"
      ? "M"
      : "F");
    let nationality = NATIONALITY.find((item) => {
      return item.label === response.location.name.split(", ")[1];
    });
    nationality = (
      !nationality
      ? "TN"
      : nationality.value);

    let userData = {
      age: age,
      gender: gender,
      work_status: "EM",
      relationship_status: "EN",
      nationality: nationality,
      hobbies: [
        {
          value: 1
        }
      ]
    };
    this.props.dispatch(postRegisterForm({
      ...userData
    }));
  }
  handleFacebookLogin() {
    return null;
  }

  render() {

    return (<div className="login">
      <img src="/assets/logo.png" className="logo"/>
      <ReduxBlockUi tag="div" block="POST_REGISTER_FORM" unblock={["POST_REGISTER_FORM_FULFILLED", "POST_REGISTER_FORM_REJECTED"]}>
        <FacebookLogin socialId="160726801313681" language="fr_FR" scope="public_profile,email,user_age_range,user_birthday,user_gender,user_location,user_hometown" responseHandler={this.callbackFacebookLogin.bind(this)} xfbml={true} fields="id,email,name,birthday,gender,location,hometown" version="v3.0" className="btn btn-facebook" buttonText="Continue With Facebook"/>
        <NavLink to="/register" className="no-facebook">
          {"I don't have Facebook"}
        </NavLink>
      </ReduxBlockUi>
    </div>);
  }
}

Login.propTypes = {
  posting: PropTypes.bool,
  posted: PropTypes.bool,
  dispatch: PropTypes.func
};

export default Login;
