import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Card, CardBody} from "reactstrap";
import _ from "underscore";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";

import Discount from "./components/Discount";

@connect((store) => {
  let fidelityStore = store.fidelity;
  return {discountsData: fidelityStore.discountsData};
})

class Discounts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDiscounts(discounts) {
    if (discounts.length > 0) {
      return (<div className="discount mt-4">
        {
          _.map(discounts, (discount, key) => {
            return (<Discount key={key} discount={discount}/>);
          })
        }
      </div>);
    }
  }

  render() {
    return (<div className="discounts">
      <Navbar title="Discounts" goBack="/fidelity" history={this.props.history}/> {this.renderDiscounts(this.props.discountsData.discounts)}
    </div>);
  }
}
Discounts.propTypes = {
  history: PropTypes.shape({goBack: PropTypes.func}),
  discountsData: PropTypes.shape({
    fetching: PropTypes.bool,
    fetched: PropTypes.bool,
    discounts: PropTypes.array
  })
};

export default Discounts;
