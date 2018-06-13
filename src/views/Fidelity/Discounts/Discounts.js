import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Card, CardBody} from "reactstrap";
import _ from "underscore";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";

import Discount from "./components/Discount";

// import {fetchFidelity, fetchDiscount} from "../../actions/fidelityActions";
//
// @connect((store) => {
//   let fidelityStore = store.fidelity;
//   return {fidelityData: fidelityStore.fidelityData, discountData: fidelityStore.discountData};
// })

class Discounts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const promotions = [
      {
        "code": "937c15",
        "reward": "7.02",
        "reward_currency": "EUR",
        "views": 3,
        "date": "2018-05-20T20:35:36.008158Z",
        "discount": 146
      }, {
        "code": "c0d01e",
        "reward": "37.43",
        "reward_currency": "EUR",
        "views": 16,
        "date": "2018-05-20T20:35:36.069622Z",
        "discount": 148
      }, {
        "code": "4f99dd",
        "reward": "11.70",
        "reward_currency": "EUR",
        "views": 5,
        "date": "2018-05-20T20:35:36.050409Z",
        "discount": 148
      }, {
        "code": "123940",
        "reward": "28.07",
        "reward_currency": "EUR",
        "views": 12,
        "date": "2018-05-20T20:35:36.144615Z",
        "discount": 152
      }, {
        "code": "45c5bc",
        "reward": "2.34",
        "reward_currency": "EUR",
        "views": 1,
        "date": "2018-05-20T20:35:36.126723Z",
        "discount": 152
      }
    ]
    return (<div className="discounts">
      <Navbar title="Discounts" goBack="/fidelity" history={this.props.history}/>
      <div className="promotion mt-4">
        {
          _.map(promotions, (discount, key) => {
            return (<Discount key={key} discount={discount}/>);
          })
        }
      </div>
    </div>);
  }
}
Discounts.propTypes = {
  history: PropTypes.shape({goBack: PropTypes.func})
};

export default Discounts;
