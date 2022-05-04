import React from "react";
import Classes from "./NavigationItem.module.css";


const navigation = (props) => (
  <li className={Classes.NavigationItem}>
    
      {props.children}
    
  </li>
);

export default navigation;
