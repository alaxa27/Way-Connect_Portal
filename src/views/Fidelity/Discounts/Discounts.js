import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Row, Col} from "reactstrap";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";

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
    return (<div className="discounts">
      <Navbar title="Discounts" goBack="/fidelity" history={this.props.history}/>
    </div>);
  }
}

Discounts.propTypes = {
  history: PropTypes.shape({goBack: PropTypes.func})
};

export default Discounts;
