import React from "react";
import Image from "../../../Assets/Photos/burger-logo.png";
import Classes from "./Logo.module.css";
const logo = (props) => (
  <div className={Classes.Logo}>
    <img src={Image} alt="MyBurger" />
  </div>
);

export default logo;
