import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

import {Player, ControlBar} from "video-react";
import "video-react/dist/video-react.css"; // import css

import Loader from "./Loader";

import {acknowledgeCommunication} from "../actions/dashboardActions";

@connect((store) => {
  let informationStore = store.information;
  let dashboardStore = store.dashboard;
  return {
    isHotel: informationStore.informationData.isHotel,
    communicationURL: informationStore.informationData.communicationURL,
    fetching: informationStore.fetching,
    fetched: informationStore.fetched,
    acknowledging: dashboardStore.acknowledging,
    acknowledged: dashboardStore.acknowledged
  };
})

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };
  }

  renderButton(link, icon, text, is) {
    if (is) {
      return (<div>
        <Link to={"/" + link}>
          <Button>
            <i className={"fa fa-" + icon}></i>
          </Button>
        </Link>
        <h4>
          {text}
        </h4>
      </div>);
    } else {
      return null;
    }

  }

  handleStateChange(state, prevState) {
    if (state.ended && !this.props.acknowledging && !this.props.acknowledged) {
      this.props.dispatch(acknowledgeCommunication({history: this.props.history}));
    }
  }

  playVideo() {
    if (!this.props.fetching) {
      this.setState({playing: true});
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
      this.player.play();
      this.player.toggleFullscreen();
    }
  }

  render() {
    return (<div className="dashboard">
      <div>
        <Button onClick={this.playVideo.bind(this)}>
          <Loader height={150} width={150} spinning={this.props.fetching && this.props.fetched}>
            <i className="fa fa-wifi"></i>
          </Loader>
        </Button>
        <h4>
          {"Join the WiFi Network"}
        </h4>
      </div>
      {this.renderButton("claim", "exclamation-triangle", "Make a Claim", this.props.isHotel)}
      {this.renderButton("fidelity", "hand-holding-usd", "Fidelity Bonus", !this.props.isHotel)}
      <div className={(
          this.state.playing
          ? "video-playing"
          : "video-not-playing")}>
        <Player ref={(c) => { this.player = c; }}>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"/>
          <ControlBar disabled={true}/>
        </Player>
      </div>

    </div>);
  }
}

Dashboard.propTypes = {
  isHotel: PropTypes.bool,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  acknowledging: PropTypes.bool,
  acknowledged: PropTypes.bool,
  dispatch: PropTypes.func,
  history: PropTypes.object
};

export default Dashboard;
