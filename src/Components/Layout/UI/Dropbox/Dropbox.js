import React from "react";
import "./Dropbox.css";
const dropbox = (props) =>
  props.show ? <div className="Dropbox" onClick={props.onCancel}></div> : null;

export default dropbox;
