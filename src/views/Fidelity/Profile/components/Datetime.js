import React, {Component} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Label} from "reactstrap";
import DateTime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

@translate("translations")

class Datetime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.updateField = this.updateField.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  updateField(val) {
    this.setState({value: val.format("DD MMM YYYY")});
    this.props.updateValue(this.props.name, val.format("YYYY-MM-DD"));
  }

  renderInput(props, openCalendar, closeCalendar) {
    return (<div {...props}>{this.state.value}</div>);
  }

  render() {
    let {t, i18n} = this.props;
    return (<div>
      <Label>
        <p>{t("question.datetime.label")}</p>
        {this.props.title}
      </Label>
      <DateTime viewMode="years" renderInput={this.renderInput} viewDate={moment().year(1980)} dateFormat={moment().format("DD MMM YYYY")} timeFormat={false} onChange={this.updateField} closeOnSelect={true}/>
    </div>);
  }
}

Datetime.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  updateValue: PropTypes.func,
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Datetime;
