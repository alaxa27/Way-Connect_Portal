import React, {Component} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Label} from "reactstrap";

import SelectBox from "../../../../components/SelectBox";

@translate("translations")

class Select extends Component {
  constructor(props) {

    super(props);
    this.updateField = this.updateField.bind(this);
  }

  updateField(val) {
    this.props.updateValue(this.props.name, val);
  }

  render() {
    let {t, i18n} = this.props;
    return (<div>
      <Label>
        <p>{t("question.select.label")}</p>
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
  isMulti: PropTypes.bool.isRequired,
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Select;
