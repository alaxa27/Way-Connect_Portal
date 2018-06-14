import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import {axiosInstance} from "./constants/ApiConfig";

import {fetchConnection} from "./actions/informationActions";

import Gateway from "./views/Gateway";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Claim from "./views/Claim";
import Fidelity from "./views/Fidelity";
import Discounts from "./views/Fidelity/Discounts";
import Profile from "./views/Fidelity/Profile";
import WifiAccess from "./views/WifiAccess";

const PrivateRoute = ({
  component: Component,
  to: toComponent,
  display: display,
  ...rest
}) => (<Route exact={true} {...rest} render={(props) => (
    display
    ? <Component {...props}/>
    : <Redirect to={{
        pathname: toComponent,
        state: {
          from: props.location
        }
      }}/>)}/>);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  to: PropTypes.string,
  display: PropTypes.bool
};

class App extends Component {
  constructor(props) {
    super(props);
    /// IN DEVELOPMENT /
    this.props.dispatch(fetchConnection({API_Key: "409582aa0ce24032904b49f145f725cc", mac_address: "11:ED:1D:F2:1B:1B", token: "idujza"}));
    ////////////////////
  }

  render() {
    const {fetched, isKnown, isHotel} = this.props;
    return (<div>
      <div className="background"></div>
      <div className="app">
        <Switch>
          <Route path="/gateway" name="Gateway" component={Gateway} />

          <Route path="/dashboard" name="Dashboard" component={Dashboard} />

          <Route path="/wifi-access" name="WifiAccess" component={WifiAccess} />

          <Route exact={true} path="/fidelity" name="Fidelity" component={Fidelity}/>
          <Route path="/fidelity/discounts" name="Discounts" component={Discounts} />
          <Route path="/fidelity/profile" name="Profile" component={Profile} />

          <Route path="/claim" name="Claim" component={Claim} />
        </Switch>
      </div>
    </div>);
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  isKnown: PropTypes.bool,
  isHotel: PropTypes.bool,
  fetched: PropTypes.bool
};

const mapStateToProps = (store) => {
  let informationStore = store.information;
  return {isKnown: informationStore.informationData.isKnown, isHotel: informationStore.informationData.isHotel, fetched: informationStore.fetched};
};
// <Route exact="exact" path="/" name="Login" component={Login}/>

export default withRouter(connect(mapStateToProps)(App));
