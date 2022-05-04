import React from "react";
import Classes from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import Navigations from "../Navigations/Navigations";
import Menu from "../Menu/Menu";
import {connect} from 'react-redux'


const toolbar = (props) => (
  <header className={Classes.Toolbar}>
    <div>
      <Menu onOpen={props.onOpen} />
    </div>
    <div className={Classes.Logo}>
      <Logo />
    </div>
    <div className={Classes.DasktopOnly}>
      <Navigations token={props.token}/>
    </div>
  </header>
);

const mapStatetoProps =state=>{
  return{
    token: state.Auth.token != null
  }
}

export default connect(mapStatetoProps)(toolbar);
