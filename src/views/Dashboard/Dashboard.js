import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

@connect((store) => {
  let informationStore = store.information;
  return {
    isHotel: informationStore.informationData.isHotel,
  };
})

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          <i className="fa fa-wifi"></i>
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
  dispatch: PropTypes.func,
};

export default Dashboard;
