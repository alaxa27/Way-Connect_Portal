import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import Navbar from "./Navbar";
import Loader from "./Loader";

import {fetchFidelity, fetchDiscount} from "../actions/fidelityActions";

@connect((store) => {
  let fidelityStore = store.fidelity
  return {fidelityData: fidelityStore.fidelityData, discountData: fidelityStore.discountData}
})

class Fidelity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discountModal: false
    }
    this.props.dispatch(fetchFidelity())
    this.fetchDiscount = this.fetchDiscount.bind(this)
    this.toggleDiscountModal = this.toggleDiscountModal.bind(this);
  }

  toggleDiscountModal() {
    this.setState({
      discountModal: !this.state.discountModal
    });
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
        <Loader spinning={this.props.fidelityData.fetching || this.props.discountData.fetching}>
          <i className="fa fa-bolt"></i>
        </Loader>
      </Button>
      <Modal isOpen={this.state.discountModal} toggle={this.toggleDiscountModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleDiscountModal}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleDiscountModal}>Do Something</Button>{" "}
          <Button color="secondary" onClick={this.toggleDiscountModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>);
  }
}

export default Fidelity;
