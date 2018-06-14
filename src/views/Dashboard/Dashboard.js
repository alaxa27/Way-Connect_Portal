import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

import Loader from "../../components/Loader";

@connect((store) => {
  let informationStore = store.information;
  let gatewayStore = store.gateway;
  return {
    isHotel: informationStore.informationData.isHotel,
    fetching: informationStore.fetching,
    fetched: informationStore.fetched,
    acknowledging: gatewayStore.acknowledging,
    acknowledged: gatewayStore.acknowledged
  };
})

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };
  }

  renderButton(link, icon, text, render) {
    if (render) {
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
      <div>
        <Button>
          <Loader height={150} width={150} spinning={this.props.fetching || !this.props.fetched || this.props.acknowledging || !this.props.acknowledged}>
            <i className="fa fa-wifi"></i>
          </Loader>
        </Button>
        <h4>
          {"Join the WiFi Network"}
        </h4>
      </div>
      {this.renderButton("claim", "exclamation-triangle", "Make a Claim", this.props.isHotel)}
      {this.renderButton("fidelity", "hand-holding-usd", "Fidelity Bonus", !this.props.isHotel)}

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
};

export default Dashboard;
