import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import { axiosInstance } from "./constants/ApiConfig";

import {fetchInformation} from "./actions/informationActions";

import Loading from "./components/Loading";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Claim from "./components/Claim";
import Fidelity from "./components/Fidelity";
import Video from "./components/Video";

// @connect((store) => {
//   let informationStore = store.information
//   return {isKnown: informationStore.isKnown}
// })

class App extends Component {
  constructor(props) {
    super(props);
    axiosInstance.defaults.headers.common["X-API-Key"] = "899f49e5e44d41a3ad8fe1a7368fd189";
    this.props.dispatch(fetchInformation());
  }

  renderKnownRoutes(isKnown, isHotel, fetched) {
    if (!isKnown && fetched) {
      return (<Switch>
        <Route exact="exact" path="/" name="Login" component={Login}/>
        <Route path="/login" name="Login" component={Login}/>
        <Route path="/register" name="Register" component={Register}/>
      </Switch>);
    } else if (isKnown && fetched) {
      return (<Switch>
        <Route exact="exact" path="/" name="Dashboard" component={Dashboard}/>
        <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
        <Route path="/video" name="Video" component={Video}/>{
          ((isHotel) => {
            if (isHotel) {
              return (<Route path="/claim" name="Claim" component={Claim}/>);
            } else if (!isHotel) {
              return (<Route path="/fidelity" name="Fidelity" component={Fidelity}/>);
            }
          })(isHotel)
        }
      </Switch>);
    } else {
      return (<div></div>);
    }
  }

  render() {
    return (<div>
      <div className="background"></div>
      <div className="app">
        {this.renderKnownRoutes(this.props.isKnown, this.props.isHotel, this.props.fetched)}
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
