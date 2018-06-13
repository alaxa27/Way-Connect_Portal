import React, {Component} from "react";
import PropTypes from "prop-types";

class Discount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const promotion = {
      ...this.props.discount
    }
    return (
      <div className="promotion__item d-flex align-items-center my-3 px-4 py-1">
        <div className="promotion__circle-container pr-4">
          <div className="promotion__circle">
            <span>{promotion.reward}</span>
            <span>{promotion.reward_currency}</span>
          </div>
        </div>
        <div className="pl-4" style={{
            flex: 1
          }}>
          <label className="promotion__label-middle">{promotion.code.toUpperCase()}</label>
          <span className="promotion__span-middle">{new Date(promotion.date).toLocaleString()}</span>
        </div>
        <div className="text-right">
          <label className="promotion__label-right">{promotion.views}<sup>th</sup>
          </label>
          <span className="promotion__span-right">visit</span>
        </div>
    </div>);
  }
}

Discount.propTypes = {
  discount: PropTypes.shape({reward: PropTypes.string, reward_currency: PropTypes.string, date: PropTypes.string, views: PropTypes.number}).isRequired
};

export default Discount;
