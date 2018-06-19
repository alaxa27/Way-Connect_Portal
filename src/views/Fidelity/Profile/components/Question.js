import React, {Component} from "react";
import PropTypes from "prop-types";
import {Label} from "reactstrap";

import SelectBox from "../../../../components/SelectBox";

class Question extends Component {
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
        <p>{"Select your"}</p>
        {this.props.title}
      </Label>
      <SelectBox name={this.props.name} options={this.props.options} onChange={this.updateField}/>
    </div>);
  }
}

Question.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  updateValue: PropTypes.func
};

export default Question;
