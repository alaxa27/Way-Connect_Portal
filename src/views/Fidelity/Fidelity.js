import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {Link} from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

import {fetchFidelity, fetchDiscount} from "../../actions/fidelityActions";

@translate("translations")
@connect((store) => {
  let fidelityStore = store.fidelity;
  return {fidelityData: fidelityStore.fidelityData, discountData: fidelityStore.discountData};
})

class Fidelity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountModal: false
    };
    this.props.dispatch(fetchFidelity());
    this.fetchDiscount = this.fetchDiscount.bind(this);
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
    this.props.dispatch(fetchDiscount({toggleDiscountModal: this.toggleDiscountModal}));
  }

  render() {
    let {t, i18n} = this.props;
    let fidelityRate = this.calcHeight(this.props.fidelityData.rate);
    console.log(this.props.location);
    return (<div className="fidelity">
      <Navbar title={t("fidelity.title")} goBack={this.props.location.state ? "" : "/dashboard"} history={this.props.history} moreIcon="fa-database" goMore="/fidelity/discounts"/>

      <div>
        <Link to="/fidelity/profile">
          <Button className="my-info enabled">
            <i className="fa fa-plus"></i>
          </Button>
        </Link>

        <div className="logo">
          <div className="logo-white">
            <img src="assets/logo-fullgradient.png"></img>
          </div>
          <div className="logo-black" style={{
              height: fidelityRate + "px"
            }}>
            <img src="assets/logo-black.png"></img>
          </div>
        </div>
      </div>
      <h2>{this.props.fidelityData.rate * 100}{" "}%</h2>
      <div className="bonus-max">
        {this.props.fidelityData.amount + "/" + this.props.fidelityData.reward}
      </div>
      <Button className={"activate" + (
          this.props.fidelityData.rate > 0
          ? " enabled"
          : " disabled")} onClick={this.fetchDiscount}>
        <Loader spinning={this.props.fidelityData.fetching || this.props.discountData.fetching} width={50} height={50}>
          <React.Fragment>
            <i className="fa fa-bolt"></i>{" " + t("fidelity.activate")}
          </React.Fragment>
        </Loader>
      </Button>
      <Modal isOpen={this.state.discountModal} toggle={this.toggleDiscountModal} className={this.props.className}>
        <ModalHeader toggle={this.toggleDiscountModal}>{t("fidelity.waiter")}</ModalHeader>
        <ModalBody>
          <h4>
            {this.props.discountData.code}
          </h4>
          <h4>
            {this.props.discountData.reward}
          </h4>
          <h4>
            {new Date(this.props.discountData.date).toLocaleString()}
          </h4>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleDiscountModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>);
  }
}

Fidelity.propTypes = {
  dispatch: PropTypes.func,
  fidelityData: PropTypes.shape({rate: PropTypes.number, amount: PropTypes.number, reward: PropTypes.string, fetching: PropTypes.bool, fetched: PropTypes.bool}),
  discountData: PropTypes.shape({code: PropTypes.string, reward: PropTypes.string, date: PropTypes.string, fetching: PropTypes.bool, fetched: PropTypes.bool}),
  className: PropTypes.string,
  history: PropTypes.shape({goBack: PropTypes.func}),
  location: PropTypes.shape({state: PropTypes.bool}),
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Fidelity;
