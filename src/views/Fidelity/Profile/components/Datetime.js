import React, {Component} from "react";
import PropTypes from "prop-types";
import {Label} from "reactstrap";
import DateTime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

import i18n from "../../../../constants/i18n";

class Datetime extends Component {
  constructor(props) {
    super(props);
    this.updateField = this.updateField.bind(this);
  }

  updateField(val) {
    this.props.updateValue(this.props.name, val.format("YYYY-MM-DD"));
  }

  render() {
    return (<div>
      <Label>
        <p>{i18n.t("question.datetime.label")}</p>
        {this.props.title}
      </Label>
      <DateTime viewMode="years" viewDate={moment().year(1980)} dateFormat={moment().format("DD MMM YYYY")} timeFormat={false} onChange={this.updateField} closeOnSelect={true} />
    </div>);
  }
}

Datetime.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  updateValue: PropTypes.func
};

export default Datetime;
