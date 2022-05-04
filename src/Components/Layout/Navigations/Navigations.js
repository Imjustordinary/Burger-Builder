import React from "react";
import Navigation from "./Navigation/NavigationItem";
import "./Navigations.css";
import {NavLink} from 'react-router-dom'

const navigations = (props) => {

  let body = 
  <React.Fragment>
  <Navigation >
  <NavLink to='/order' activeStyle={{color: '#40a4c8'}}>
  Order
  </NavLink>
  </Navigation>
  <Navigation >
  <NavLink to='/logout' activeStyle={{color: '#40a4c8'}}>
  Log out
  </NavLink>
  </Navigation>
  </React.Fragment>
  
  return (
        <ul className={"Navigations"}>
            
            <Navigation >
            <NavLink to='/' activeStyle={{color: '#40a4c8'}}  exact>
              Home
              </NavLink>
            </Navigation>
          {props.token?body
            :
            <Navigation>
            <NavLink to='/auth' activeStyle={{color: '#40a4c8'}}>
            Authentication
            </NavLink>

            </Navigation>

          }  
          </ul>
)
        }

export default navigations;
