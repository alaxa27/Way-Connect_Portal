import React, {Component} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Label, Input} from "reactstrap";

@translate("translations")

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.options[0].value
    };
    this.updateField = this.updateField.bind(this);
  }

  updateField(event) {
    let value = event.target.value;
    this.setState({checked: value});
    this.props.updateValue(this.props.name, value);
  }

  render() {
    let {t, i18n} = this.props;
    return (<div>
      <Label>
        <p>{"Choose your"}</p>
        {this.props.title}
      </Label>
      <div className="radio-buttons">
        {this.props.options.map((item, key) => {
          return (
            <div key={key}>
              <Input type="radio" id={item.value} name="radio" value={item.value} checked={this.state.checked === item.value} onChange={this.updateField}/>
              <Label htmlFor={item.value} className="pull-left">{item.label}</Label>
            </div>
          );
        })}
        <div className="clearfix"></div>
      </div>
    </div>);
  }
}

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired,
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Radio;
