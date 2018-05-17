import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

@connect((store) => {
  let informationStore = store.information;
  return {isHotel: informationStore.informationData.isHotel, communicationURL: informationStore.informationData.communicationURL};
})

class Dashboard extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (<div className="dashboard">
      {this.renderButton("video", "wifi", "Join the WiFi Network", true)}
      {this.renderButton("claim", "exclamation-triangle", "Make a Claim", this.props.isHotel)}
      {this.renderButton("fidelity", "hand-holding-usd", "Fidelity Bonus", !this.props.isHotel)}
    </div>);
  }
}

Dashboard.propTypes = {
  isHotel: PropTypes.bool
};

export default Dashboard;
