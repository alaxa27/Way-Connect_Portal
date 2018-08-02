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
    color: "ffffff",
    borderRadius: "1.5rem",
    minHeight: "28px",
    width: "100%"
  }),
  singleValue: (base, state) => ({
    ...base,
    color: "ffffff"
  }),
  menu: (base, state) => ({
    ...base,
    backgroundColor: "#4d4d4d",
  }),
  option: (base, {isSelected, isFocused}) => ({
    ...base,
    backgroundColor: isSelected ? "#202020" : isFocused ? "#2020201f" : null
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
