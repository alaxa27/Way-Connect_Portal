import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {Row, Input, Label, Button} from "reactstrap";

import Navbar from "./Navbar";
import Loader from "./Loader";

import {postClaim} from "../actions/claimActions";

import {POST_CLAIM_REDIRECTED} from "../constants/ActionTypes"

@connect((store) => {
  let claimStore = store.claim
  return {claimData: claimStore.claimData, posting: claimStore.posting, posted: claimStore.posted}
})

class Claim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claimData: this.props.claimData
    };

    this.postClaim = this.postClaim.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  updateEmail(e) {
    let claimData = this.state.claimData;
    claimData.email = e.target.value
    this.setState({claimData})
  }

  updateName(e) {
    let claimData = this.state.claimData;
    claimData.name = e.target.value
    this.setState({claimData})
  }

  updateContent(e) {
    let claimData = this.state.claimData;
    claimData.content = e.target.value
    this.setState({claimData})
  }

  postClaim() {
    this.props.dispatch(postClaim({
      ...this.state
    }))
  }

  renderRedirect() {
    if (this.props.posted) {
      this.props.dispatch({type: POST_CLAIM_REDIRECTED})
      return (<Redirect to="/dashboard"></Redirect>)
    }
  }

  render() {
    return (<div className="claim">
      {this.renderRedirect()}

      <Navbar title="Make a Claim" goBack={this.props.history.goBack}/>
      <Row>
        <Label>
          Your Email
        </Label>
      </Row>
      <Row>
        <Input type="email" name="email" id="exampleEmail" placeholder="mail@mail.com" value={this.state.claimData.email} onChange={this.updateEmail}/>
      </Row>
      <Row>
        <Label>
          Your Name
        </Label>
      </Row>
      <Row>
        <Input type="text" name="name" placeholder="name" value={this.state.claimData.name} onChange={this.updateName}/>
      </Row>
      <Row>
        <Label>
          Your Claim
        </Label>
      </Row>
      <Row>
        <Input type="textarea" name="content" id="content" rows="10" value={this.state.claimData.content} onChange={this.updateContent}/>
      </Row>
      <Row>
        <Button size="lg" block="block" className="submit" onClick={this.postClaim}>
          <Loader spinning={this.props.posting} height="22" width="22">
            Submit
          </Loader>
        </Button>
      </Row>
    </div>);
  }
}

export default Claim;
