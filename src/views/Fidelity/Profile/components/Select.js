import React, {Component} from "react";
import PropTypes from "prop-types";
import {Label} from "reactstrap";

import i18n from "../../../../constants/i18n";

import SelectBox from "../../../../components/SelectBox";

class Select extends Component {
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
        <p>{i18n.t("question.select.label")}</p>
        {this.props.title}
      </Label>
      <SelectBox name={this.props.name} options={this.props.options} onChange={this.updateField} isMulti={this.props.isMulti}/>
    </div>);
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired,
  isMulti: PropTypes.bool.isRequired
};

export default Select;
