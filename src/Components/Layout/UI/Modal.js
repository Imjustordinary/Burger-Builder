import React from "react";
import Classes from "./Modal.module.css";
import Dropbox from "./Dropbox/Dropbox";
const Modal = (props) => (
  <React.Fragment>
    <Dropbox show={props.show} onCancel={props.onCancel} />
    <div
      className={props.idenClass?[Classes.Modal,Classes[props.idenClass]].join(' '):Classes.Modal}
      style={{
        transform: props.show ? "translateY(-5vh)" : "translateY(100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
