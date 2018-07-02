import React, {Component} from "react";
import PropTypes from "prop-types";

import Radio from "./Radio";
import Select from "./Select";
import Datetime from "./Datetime";

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
}

Question.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.array,
  updateValue: PropTypes.func
};

export default Question;
