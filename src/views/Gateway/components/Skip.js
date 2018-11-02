import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {translate} from "react-i18next";

import Countdown from "../../../components/Countdown";
import ActionButton from "../../../components/ActionButton";

@translate("translations")
class Skip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticking: true
    };
    this._renderInner = this._renderInner.bind(this);
  }

  componentDidMount() {
      this.timerHandle = setTimeout(() => {
        this.props.action();
        this.setState({ticking: false});
      }, 5000);
  }

// componentDidUpdate(prevProps, prevState) {
//   if (prevProps.show !== this.props.show) {
//     if (!this.props.exists) {
//       this.setState({ticking: false});
//     }
//     this.timerHandle = setTimeout(() => {
//       this.setState({ticking: false});
//     }, 4000);
//   }
// }

  componentWillUnmount = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  };

  _renderInner() {
    return (<div>
      <Countdown className={`${ (
          !this.state.ticking
          ? "pulse"
          : "")} skip`} r="30" width="4">
        <ActionButton gradient={false} icon="arrow-right" show={true} className="countdown__children skip" action={() => {
            if (!this.state.ticking && this.props.skippable) {
              this.props.onClick();
            }
          }}/>
      </Countdown>
    </div>);
  }

  render() {
    console.log(this.state);
    let {show} = this.props;
    return (<React.Fragment>
      {this._renderInner()}
    </React.Fragment>);
  }
}

Skip.defaultProps = {
  exists: true,
  show: true,
  pulse: true,
  skippable: true
};

Skip.propTypes = {
  action: PropTypes.func.isRequired,
  exists: PropTypes.bool,
  show: PropTypes.bool,
  children: PropTypes.object,
  skippable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  history: PropTypes.shape({push: PropTypes.func})
};

export default Skip;
