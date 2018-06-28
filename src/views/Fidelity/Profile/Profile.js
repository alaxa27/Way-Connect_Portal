import React, {Component} from "react";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Progress} from "reactstrap";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import Congratulations from "./components/Congratulations";
import Question from "./components/Question";

import {postQuestion} from "../../../actions/fidelityActions";

@translate("translations")
@connect((store) => {
  let fidelityStore = store.fidelity;
  return {questionsData: fidelityStore.questionsData};
})

class Profile extends Component {
  constructor(props) {

    super(props);
    this.state = {
      id: this.props.questionsData.id,
      questions: this.props.questionsData.questions
    };

    this.updateValue = this.updateValue.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.questionsData.questions.length !== this.state.questions || this.props.questionsData.id !== this.state.id) {
      this.setState({id: nextProps.questionsData.id, questions: nextProps.questionsData.questions});
    }
  }

  updateValue(name, val) {
    let questions = [...this.state.questions];
    const index = questions.findIndex(e => e.name === name);
    questions[index].value = val;
    this.setState({questions: questions});
  }

  goToNextQuestion() {
    if (this.state.questions[this.state.id].value && this.state.id < this.state.questions.length) {
      this.props.dispatch(postQuestion({id: this.state.id, answer: this.state.value}));
    }
  }

  _renderQuestion() {
    if (this.state.id < this.state.questions.length) {
      return (<div className="question-block">
        <Question {...this.state.questions[this.state.id]} updateValue={this.updateValue}/>
        <Button className="next-btn" onClick={this.goToNextQuestion}>
          {this.props.t("question.next") + " "}
          <i className="fa fa-chevron-right"></i>
        </Button>
      </div>);
    } else {
      return (<Congratulations/>);
    }
  }

  render() {
    let {t, i18n} = this.props;
    return (<div className="profile">
      <Navbar title={t("fidelity.profile.title")} goBack="/fidelity" history={this.props.history}/>
      <Progress value={(this.state.id / this.state.questions.length) * 100}/>
      <Loader spinning={this.props.questionsData.fetching || !this.props.questionsData.fetched || this.props.questionsData.posting}>
        {this._renderQuestion()}
      </Loader>
    </div>);
  }
}

Profile.propTypes = {
  history: PropTypes.shape({goBack: PropTypes.func}),
  dispatch: PropTypes.func,
  questionsData: PropTypes.shape({posting: PropTypes.bool, fetching: PropTypes.bool, fetched: PropTypes.bool, questions: PropTypes.array, id: PropTypes.number}),
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Profile;
