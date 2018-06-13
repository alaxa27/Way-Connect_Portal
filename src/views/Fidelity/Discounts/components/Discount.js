import React, {Component} from "react";
import PropTypes from "prop-types";

class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const discount = {
      ...this.props.discount
    };
    return (
      <div className="discount__item d-flex align-items-center my-3 px-4 py-1">
        <div className="discount__circle-container pr-4">
          <div className="discount__circle">
            <span>{discount.reward}</span>
            <span>{discount.reward_currency}</span>
          </div>
        </div>
        <div className="pl-4" style={{
            flex: 1
          }}>
          <label className="discount__label-middle">{discount.code.toUpperCase()}</label>
          <span className="discount__span-middle">{new Date(discount.date).toLocaleString()}</span>
        </div>
        <div className="text-right">
          <label className="discount__label-right">{discount.views}<sup>th</sup>
          </label>
          <span className="discount__span-right">visit</span>
        </div>
      </div>);
  }
}

Discount.propTypes = {
  discount: PropTypes.shape({reward: PropTypes.string, reward_currency: PropTypes.string, date: PropTypes.string, views: PropTypes.number}).isRequired
};

export default Discount;
