import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col, Input, Label} from "reactstrap";
import InputRange from "react-input-range";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 5,
      gender: "male"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({gender: event.target.value});
  }

  render() {

    return (<div className="register">
      <Row>
        <Col>
          <div className="gender-radio-buttons">
            <Input type="radio" id="male" name="gender" value="male" checked={this.state.gender === "male"} onChange={this.handleInputChange}/>
            <Label htmlFor="male" className="pull-left">Male</Label>
            <Input type="radio" id="female" name="gender" value="female" checked={this.state.gender === "female"} onChange={this.handleInputChange}/>
            <Label htmlFor="female" className="pull-right">Female</Label>
            <div className="clearfix"></div>
          </div>
        </Col>
      </Row>
      <Row>
        <h2>
          Age
        </h2>
      </Row>
      <Row>
        <InputRange maxValue={100} minValue={0} value={this.state.age} onChange={age => this.setState({age})}/>
      </Row>
      <Row>
        <h2>
          Relationship
        </h2>
      </Row>
      <Row className="select-box">
        <Input type="select" name="select" id="exampleSelect" className="input">
          <option value="valeur1">Valeur 1</option>
          <option value="valeur2">Valeur 2</option>
          <option value="valeur3">Valeur 3</option>
        </Input>
        <i className="fa fa-arrow-circle-down arrow"></i>
      </Row>

      <Row>
        <h2>
          Professional
        </h2>
      </Row>
      <Row className="select-box">
        <Input type="select" name="select" id="exampleSelect" className="input">
          <option value="valeur1">Valeur 1</option>
          <option value="valeur2">Valeur 2</option>
          <option value="valeur3">Valeur 3</option>
        </Input>
        <i className="fa fa-arrow-circle-down arrow"></i>
      </Row>
      <Row>
        <Button size="lg" block="block" className="submit">Submit</Button>
      </Row>
    </div>);
  }
}

export default Register;
