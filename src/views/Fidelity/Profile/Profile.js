import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Progress} from "reactstrap";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import Congratulations from "./components/Congratulations";
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
      id: 0,
      questions: [
        {
          name: "birthday",
          type: "date",
          title: "Birthday",
          value: null
        }, {
          name: "nationality",
          type: "select-unique",
          title: "Nationality",
          options: STATUS["NATIONALITY"],
          value: null
        }, {
          name: "work",
          type: "select-unique",
          title: "Work Status",
          options: STATUS["PROFESSIONAL"],
          value: null
        }, {
          name: "relationship",
          type: "select-unique",
          title: "Relationship Status",
          options: STATUS["RELATIONSHIP"],
          value: null
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
    this.setState({questions: questions});
  }

  goToNextQuestion() {
    if (this.state.questions[this.state.id].value !== null && this.state.id < this.state.questions.length) {
      this.setState({
        id: this.state.id + 1
      });
    }
    console.log(this.state);
  }

  _renderQuestion() {
    if (this.state.id < this.state.questions.length) {
      return (<div className="question-block">
        <Question {...this.state.questions[this.state.id]} updateValue={this.updateValue}/>
        <Button className="next-btn" onClick={this.goToNextQuestion}>
          {"Next Question"}
          <i className="fa fa-chevron-right"></i>
        </Button>
      </div>);
    } else {
      return (<Congratulations/>);
    }

  }

  render() {
    return (<div className="profile">
      <Navbar title="Profile" goBack="/fidelity" history={this.props.history}/>
      <Progress value={(this.state.id / this.state.questions.length) * 100}/> {this._renderQuestion()}
    </div>);
  }
}

Profile.propTypes = {
  history: PropTypes.shape({goBack: PropTypes.func})
};

export default Profile;
