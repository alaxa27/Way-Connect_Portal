import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

import {fetchFidelity, fetchDiscount} from "../actions/fidelityActions";

@connect((store) => {
  let fidelityStore = store.fidelity
  return {fidelityData: fidelityStore.fidelityData, fetching: fidelityStore.posting, fetched: fidelityStore.posted}
})

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fidelityRate: "200",
      amount: 10
    }
    this.props.dispatch(fetchFidelity({
      ...this.props.fidelityData
    }))

    this.fetchDiscount = this.fetchDiscount.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      fidelityRate: this.calcHeight(props.fidelityData.rate)
    })
  }

  calcHeight(fidelity) {
    const height = 200;
    return ((1 - fidelity) * height).toString();
  }

  fetchDiscount() {
    this.props.dispatch(fetchDiscount({
      ...this.props.fidelityData
    }))
  }

  render() {
    return (<div className="fidelity">
      <h4>Fidelity</h4>
      <div className="logo">
        <div className="logo-white">
          <img src="assets/logo-white.png"></img>
        </div>
        <div className="logo-black" style={{
            height: this.state.fidelityRate + "px"
          }}>
          <img src="assets/logo-black.png"></img>
        </div>
      </div>
      <h2>{this.props.fidelityData.rate * 100}{" "}%</h2>
      <div className="bonus-max">
        <i className="fa fa-star"></i>
        {" " + this.state.amount + " DT"}
        </div>
      <Button className="activate" onClick={this.fetchDiscount}>
        <i className="fa fa-bolt"></i>
      </Button>


    </div>);
  }
}

export default Dashboard;
