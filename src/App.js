import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import {axiosInstance} from "./constants/ApiConfig";
import {INFORMATIONS} from "./constants/ActionTypes";

import {dispatchInformations} from "./actions/informationActions";

import Gateway from "./views/Gateway";
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
    if (process.env.NODE_ENV !== "production") {
      this.props.dispatch(dispatchInformations({mac_address: "11:AD:4D:F2:1B:1B", token: "idujza"}));
    }
    ////////////////////
  }

  render() {
    const {fetched, acknowledged} = this.props;
    return (<div>
      <div className="background"></div>
      <div className="app">
        <Switch>
          <Route path="/gateway" name="Gateway" component={Gateway}/>

          <PrivateRoute path="/dashboard" name="Dashboard" component={Dashboard} to="/gateway/way-connect" display={fetched && acknowledged}/>

          <PrivateRoute path="/wifi-access" name="WifiAccess" component={WifiAccess} to="/gateway/way-connect" display={fetched && acknowledged}/>

          <Route exact={true} path="/fidelity" name="Fidelity" component={Fidelity}/>
          <Route path="/fidelity/discounts" name="Discounts" component={Discounts}/>
          <Route path="/fidelity/profile" name="Profile" component={Profile}/>

          <PrivateRoute path="/claim" name="Claim" component={Claim} to="/gateway/way-connect" display={fetched && acknowledged}/>
        </Switch>
      </div>
    </div>);
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  fetched: PropTypes.bool,
  acknowledged: PropTypes.bool
};

const mapStateToProps = (store) => {
  let informationStore = store.information;
  let gatewayStore = store.gateway;
  return {fetched: informationStore.fetched, acknowledged: gatewayStore.acknowledged};
};

export default withRouter(connect(mapStateToProps)(App));
