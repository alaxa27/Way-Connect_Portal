import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Label} from "reactstrap";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import SelectBox from "../../../components/SelectBox";

const STATUS = require("../../../data/status");

// import {fetchFidelity, fetchDiscount} from "../../actions/fidelityActions";
//
// @connect((store) => {
//   let fidelityStore = store.fidelity;
//   return {fidelityData: fidelityStore.fidelityData, discountData: fidelityStore.discountData};
// })

class Profile extends Component {
  constructor(props) {

    super(props);
    this.state = {
      nationality: STATUS["NATIONALITY"]
    };
    this.updateNationality = this.updateNationality.bind(this);
  }

  updateNationality(val) {
    let userData = {
      ...this.state.userData
    };
    userData.nationality = val;
    this.setState({userData});
  }

  render() {
    return (<div className="profile">
      <Navbar title="Profile" goBack="/fidelity" history={this.props.history}/>
      <div>
        <Label>
          <p>{"Select your"}</p>
          {"Nationality"}
        </Label>
        <SelectBox name="nationality-select" options={this.state.nationality} onChange={this.updateNationality}/>
      </div>
      <Button className="next-btn">
        {"Next Question"}
        <i className="fa fa-chevron-right"></i>
      </Button>
    </div>);
  }
}

Profile.propTypes = {
  history: PropTypes.shape({goBack: PropTypes.func})
};

export default Profile;
