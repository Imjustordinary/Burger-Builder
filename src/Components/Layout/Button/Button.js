import classes from "./Button.module.css";
import React from "react";

const button = (props) =>
  props.btnType !== "Danger" ? (
    <button
      disabled={props.disable}
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.onOrder}
    >
      {props.children}
    </button>
  ) : (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.onCancel}
    >
      {props.children}
    </button>
  );

export default button;
