import React, {Component} from "react";
import PropTypes from "prop-types";
import {Label} from "reactstrap";

import Radio from "./Radio";
import Select from "./Select";
import Datetime from "./Datetime";

class Question extends Component {
  constructor(props) {
    super(props);
  }

  _renderQuestionType() {
    switch (this.props.type) {
      case "radio":
        return (<Radio {...this.props}/>);
      case "select-unique":
        return (<Select {...this.props} isMulti={false}/>);
      case "select-multi":
        return (<Select {...this.props} isMulti={true}/>);
      case "date":
        return (<Datetime {...this.props}/>);
    }
  }
  render() {
    return (<React.Fragment>
      <div className="icon">
        <i className={`fas fa-${this.props.icon}`}/>
      </div>
      <Label>
        {this.props.title}
      </Label>
      {this._renderQuestionType()}
    </React.Fragment>);
  }
}

Question.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.array,
  name: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  updateValue: PropTypes.func
};

export default Question;
