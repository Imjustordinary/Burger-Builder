import React from "react";
import Classes from "./Menu.module.css";

const Menu = (props) => (
  <div className={Classes.DrawerToggle} onClick={props.onOpen}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Menu;
