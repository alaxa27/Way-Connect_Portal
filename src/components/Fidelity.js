import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

import Navbar from "./Navbar";
import Loader from "./Loader";

import {fetchFidelity, fetchDiscount} from "../actions/fidelityActions";

@connect((store) => {
  let fidelityStore = store.fidelity
  return {fidelityData: fidelityStore.fidelityData, fetching: fidelityStore.fetching, fetched: fidelityStore.fetched}
})

class Fidelity extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.dispatch(fetchFidelity())
    this.fetchDiscount = this.fetchDiscount.bind(this)
  }

  calcHeight(fidelity) {
    const height = 200;
    return ((1 - fidelity) * height).toString();
  }

  fetchDiscount() {
    this.props.dispatch(fetchDiscount())
  }

  render() {
    let fidelityRate = this.calcHeight(this.props.fidelityData.rate)
    return (<div className="fidelity">
      <Navbar title="Fidelity" goBack={this.props.history.goBack}/>

      <div className="logo">
        <div className="logo-white">
          <img src="assets/logo-white.png"></img>
        </div>
        <div className="logo-black" style={{
            height: fidelityRate + "px"
          }}>
          <img src="assets/logo-black.png"></img>
        </div>
      </div>
      <h2>{this.props.fidelityData.rate * 100}{" "}%</h2>
      <div className="bonus-max">
        <i className="fa fa-star"></i>
        {" " + this.props.fidelityData.amount + " DT"}
      </div>
      <Button className="activate" onClick={this.fetchDiscount}>
        <Loader spinning={this.props.fetching}>
          <i className="fa fa-bolt"></i>
        </Loader>
      </Button>

    </div>);
  }
}

export default Fidelity;
