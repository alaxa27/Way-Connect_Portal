import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {Link} from "react-router-dom";
import {Row, Col, Card, CardBody} from "reactstrap";
import _ from "underscore";
import TransitionGroup from "react-transition-group/TransitionGroup";
import * as Animated from "animated/lib/targets/react-dom";

import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";

import Discount from "./components/Discount";

@translate("translations")
@connect((store) => {
  let fidelityStore = store.fidelity;
  return {discountsData: fidelityStore.discountsData};
})

class Discounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animations: [],
      discounts: []
    };
  }

  renderDiscounts(discounts) {
    if (discounts.length > 0) {
      return (<div className="discount mt-4">
        {
          _.map(discounts, (discount, key) => {
            return (<Discount key={key} discount={discount}/>);
          })
        }
      </div>);
    }
  }

  componentDidMount() {
    this._renderDiscounts(this.props.discountsData.discounts);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.discountsData.discounts.length && nextProps.discountsData.discounts.length) {
      this._renderDiscounts(nextProps.discountsData.discounts);
    }
  }

  _renderDiscounts(discounts) {
    this.setState({
      discounts: discounts,
      animations: discounts.map((_, i) => new Animated.Value(0))
    }, () => {
      Animated.stagger(100, this.state.animations.map(anim => Animated.spring(anim, {toValue: 1}))).start();
    });
  }

  render() {
    let {t, i18n} = this.props;
    return (<div className="discounts">
      <Navbar title={t("fidelity.discounts.title")} goBack="/fidelity" history={this.props.history}/>
      <TransitionGroup component="div" className="mt-4">
        {
          this.state.discounts.map((p, i) => {
            const style = {
              opacity: this.state.animations[i],
              transform: Animated.template `
    								translate3d(0,${this.state.animations[i].interpolate({
                inputRange: [
                  0, 1
                ],
                outputRange: ["12px", "0px"]})},0)
    							`
              };
              return (<Animated.div key={i} style={style}>
                <Discount discount={p}/>
              </Animated.div>);
            })
          }
      </TransitionGroup>

    </div>);
  }
}
Discounts.propTypes = {
  history: PropTypes.shape({goBack: PropTypes.func}),
  discountsData: PropTypes.shape({fetching: PropTypes.bool, fetched: PropTypes.bool, discounts: PropTypes.array}),
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Discounts;
