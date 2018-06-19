import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Label} from "reactstrap";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import Question from "./components/Question";

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
      questions: [
        {
          name: "nationality",
          type: "select-unique",
          title: "Nationality",
          options: STATUS["NATIONALITY"],
          value: {}
        }, {
          name: "work",
          type: "select-unique",
          title: "Work Status",
          options: STATUS["PROFESSIONAL"],
          value: {}
        }, {
          name: "relationship",
          type: "select-unique",
          title: "Relationship Status",
          options: STATUS["RELATIONSHIP"],
          value: {}
        }
      ]
    };
    this.updateValue = this.updateValue.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  updateValue(name, val) {
    let questions = [...this.state.questions];
    const index = questions.findIndex(e => e.name === name);
    questions[index].value = val;
    this.setState({
      questions: questions
    });
  }

  goToNextQuestion() {
    console.log(this.state);
  }

  render() {
    return (<div className="profile">
      <Navbar title="Profile" goBack="/fidelity" history={this.props.history}/>
      <Question {...this.state.questions[0]} updateValue={this.updateValue}/>
      <Question {...this.state.questions[1]} updateValue={this.updateValue}/>
      <Button className="next-btn" onClick={this.goToNextQuestion}>
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
