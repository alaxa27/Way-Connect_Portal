import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import {axiosInstance} from "./constants/ApiConfig";

import {fetchInformation} from "./actions/informationActions";

import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Claim from "./views/Claim";
import Fidelity from "./views/Fidelity";
import WifiAccess from "./views/WifiAccess";

// @connect((store) => {
//   let informationStore = store.information
//   return {isKnown: informationStore.isKnown}
// })

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
    axiosInstance.defaults.headers.common["X-API-Key"] = "409582aa0ce24032904b49f145f725cc";
    this.props.dispatch(fetchInformation({API_Key: "409582aa0ce24032904b49f145f725cc", mac_address: "11:ED:1D:F2:1B:1B", token: "idujza"}));
    ////////////////////
  }

  render() {
    const {fetched, isKnown, isHotel} = this.props;
    return (<div>
      <div className="background"></div>
      <div className="app">
        <Switch>
          <PrivateRoute path="/login" name="Login" component={Login} to="/dashboard" display={!isKnown}/>
          <PrivateRoute path="/register" name="Register" component={Register} to="/dashboard" display={!isKnown}/>
          <PrivateRoute path="/dashboard" name="Dashboard" component={Dashboard} to="/login" display={isKnown}/>
          <PrivateRoute path="/wifi-access" name="WifiAccess" component={WifiAccess} to="/login" display={isKnown}/>
          <PrivateRoute hotel="hotel" path="/claim" name="Claim" component={Claim} to="/login" display={isKnown && isHotel}/>
          <PrivateRoute path="/fidelity" name="Fidelity" component={Fidelity} to="/login" display={isKnown && !isHotel}/>
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
