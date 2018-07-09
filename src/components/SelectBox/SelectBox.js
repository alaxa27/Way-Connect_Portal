import React, {Component} from "react";
import PropTypes from "prop-types";
import Select, {components} from "react-select";
import * as FontAwesome from "react-icons/lib/fa";

const DropdownIndicator = (props) => {
  return (<components.DropdownIndicator {...props}>
    <FontAwesome.FaArrowCircleODown/>
  </components.DropdownIndicator>);
};

const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: "none",
    backgroundColor: "#4d4d4d",
    color: "white",
    borderRadius: "1.5rem",
    minHeight: "28px",
    width: "100%"
  }),
  menu: (base, state) => ({
    backgroundColor: "#4d4d4d",
  })
};

class SelectBox extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    fixed: PropTypes.bool,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    fixed: false,
    placeholder: "Select..."
  }

  render() {
    const {
      fixed,
      options,
      ...rest
    } = this.props;
    return (<Select isDisabled={fixed} defaultValue={(
        fixed
        ? options
        : [])} options={(
        this.props.fixed
        ? []
        : options)} classNamePrefix="select" components={{
        DropdownIndicator
      }} styles={selectStyles} {...rest} menuPlacement="bottom"/>);
  }
}
export default SelectBox;
