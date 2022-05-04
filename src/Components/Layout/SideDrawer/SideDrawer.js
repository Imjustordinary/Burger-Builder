import React from "react";
import Navigations from "../Navigations/Navigations";
import Logo from "../Logo/Logo";
import Classes from "./SideDrawer.module.css";
import Dropbox from "../UI/Dropbox/Dropbox";
import {connect} from 'react-redux'

const sideDrawer = (props) => {
  let attachedClasses = [Classes.SideDrawer, Classes.Close];
  if (props.sideDraw) {
    attachedClasses = [Classes.SideDrawer, Classes.Open];
  }
  return (
    <React.Fragment>
      <div className={attachedClasses.join(" ")}>
        <div>
          <div className={Classes.Logo}>
            <Logo />
          </div>
          <nav>
            <Navigations token={props.token}/>
          </nav>
        </div>
      </div>
      <Dropbox onCancel={props.onClose} show={props.sideDraw} />
    </React.Fragment>
  );
};

const mapStatetoProps =state=>{
  return{
    token: state.Auth.token != null
  }
}

export default connect(mapStatetoProps)(sideDrawer);
