import React, { Component } from "react";
import Classes from "./BuildControl.module.css";

class BuildControl extends Component {
  render() {
    let disable = false;

    if (this.props.ingredients[this.props.Label] === 0) {
      disable = true;
    } else {
      disable = false;
    }
    return (
      <div className={Classes.BuildControl}>
        <div className={Classes.Label}>{this.props.Label}</div>
        <button
          className={Classes.Less}
          onClick={() => this.props.onRemove(this.props.Label)}
          disabled={disable}
        >
          Less
        </button>
        <button
          className={Classes.More}
          onClick={() => this.props.onAdd(this.props.Label)}
        >
          More
        </button>
      </div>
    );
  }
}

export default BuildControl;
