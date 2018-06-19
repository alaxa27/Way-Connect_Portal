import React, {Component} from "react";
import PropTypes from "prop-types";
import {Label} from "reactstrap";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";

class Datetime extends Component {
  constructor(props) {
    super(props);
    this.updateField = this.updateField.bind(this);
  }

  updateField(val) {
    this.props.updateValue(this.props.name, val);
  }

  render() {
    return (<div>
      <Label>
        <p>{"What's your"}</p>
        {this.props.title}
      </Label>
      <DateTime viewMode="years" />
    </div>);
  }
}

Datetime.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  updateValue: PropTypes.func
};

export default Datetime;
