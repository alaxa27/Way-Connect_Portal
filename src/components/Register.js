import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col, Input, Label} from "reactstrap";
import InputRange from "react-input-range";
import Select from "react-select";

import Navbar from "./Navbar";
import Loader from "./Loader";

import {postRegisterForm, fetchRegisterData} from "../actions/registerActions";

const STATUS = require("../data/status");

@connect((store) => {
  let registerStore = store.register
  return {
    userData: registerStore.userData,
    posting: registerStore.posting,
    posted: registerStore.posted,
    fetching: registerStore.fetching,
    fetched: registerStore.fetched,
    registerData: registerStore.registerData
  }
})

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.userData
    };

    this.updateGender = this.updateGender.bind(this);
    this.updateAge = this.updateAge.bind(this);
    this.updateNationality = this.updateNationality.bind(this);
    this.updateWorkStatus = this.updateWorkStatus.bind(this);
    this.updateRelationshipStatus = this.updateRelationshipStatus.bind(this);
    this.updateHobbies = this.updateHobbies.bind(this);
    this.postForm = this.postForm.bind(this);

    this.props.dispatch(fetchRegisterData())
  }

  updateGender(event) {
    let userData = {
      ...this.state.userData
    }
    userData.gender = event.target.value
    this.setState({userData});
  }

  updateAge(val) {
    let userData = {
      ...this.state.userData
    }
    userData.age = val
    this.setState({userData})
  }

  updateNationality(val) {
    let userData = {
      ...this.state.userData
    }
    userData.nationality = val
    this.setState({userData})
  }

  updateRelationshipStatus(val) {
    let userData = {
      ...this.state.userData
    }
    userData.relationship_status = val
    this.setState({userData})
  }

  updateWorkStatus(val) {
    let userData = {
      ...this.state.userData
    }
    userData.work_status = val
    this.setState({userData})
  }

  updateHobbies(val) {
    let userData = {
      ...this.state.userData
    }
    userData.hobbies = val
    this.setState({userData})
  }

  postForm() {
    this.props.dispatch(postRegisterForm({
      ...this.state
    }))
  }

  render() {
    let nationality = STATUS["NATIONALITY"]
    let workStatus = STATUS["PROFESSIONAL"]
    let relationshipStatus = STATUS["RELATIONSHIP"]
    let hobbies = this.props.registerData.hobbies

    return (<div className="register">
      {
        (
          this.props.posted
          ? <Redirect to="/dashboard"></Redirect>
          : null)
      }
      <Navbar title="Register" goBack={this.props.history.goBack}/>

      <div>
        <Row>
          <Label>
            Gender
          </Label>
        </Row>
        <div className="gender-radio-buttons">
          <div>
            <Input type="radio" id="male" name="gender" value="M" checked={this.state.userData.gender === "M"} onChange={this.updateGender}/>
            <Label htmlFor="male" className="pull-left">Male</Label>
          </div>
          <div>
            <Input type="radio" id="female" name="gender" value="F" checked={this.state.userData.gender === "F"} onChange={this.updateGender}/>
            <Label htmlFor="female" className="pull-right">Female</Label>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <div>
        <Label className="pull-left">
          Age
        </Label>
        <Label className="age-title">{this.state.userData.age}yo</Label>
        <InputRange maxValue={100} minValue={0} value={this.state.userData.age} onChange={this.updateAge}/>
      </div>
      <div>
        <Label>
          Nationality
        </Label>
        <Select id="nationality-select" ref="nationalitySelect" options={nationality} simpleValue="simpleValue" name="selected-nationality" value={this.state.userData.nationality} onChange={this.updateNationality}/>
      </div>
      <div>
        <Label>
          Relationship
        </Label>
        <Select id="relationship-select" ref="relationshipSelect" options={relationshipStatus} simpleValue="simpleValue" name="selected-realtionship" value={this.state.userData.relationship_status} onChange={this.updateRelationshipStatus}/>
      </div>
      <div>
        <Label>
          Professional
        </Label>
        <Select id="professional-select" ref="professionalSelect" options={workStatus} simpleValue="simpleValue" name="selected-professional" value={this.state.userData.work_status} onChange={this.updateWorkStatus}/>
      </div>
      <div>
        <Label>
          Hobbies
        </Label>
        <Select id="hobbies-select" ref="hobbiesSelect" options={hobbies} multi="multi" name="selected-hobbies" value={this.state.userData.hobbies} onChange={this.updateHobbies
}/>
      </div>
      <Button size="lg" block="block" className="submit" onClick={this.postForm}>
        <Loader spinning={this.props.posting} height="22" width="22">
          Submit
        </Loader>
      </Button>
    </div>);
  }
}

export default Register;
