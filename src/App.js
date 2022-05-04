import React, { Component } from 'react';
import "./App.css";
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Action from './Store/Action'
import asyncComponent from './hoc/asyncComponent'

const Layout = asyncComponent(()=>import("./Components/Layout/Layout"))
const Logout = asyncComponent(()=>import("./Components/Layout/Logout/Logout"))
const CheckOut = asyncComponent(()=>import("./Container/CheckOut/CheckOut"))
const Auth = asyncComponent(()=>import("./Components/Layout/Auth/Auth"))
const Orders = asyncComponent(()=>import("./Components/Layout/Orders/Orders"))


class App extends Component {
  
  componentDidMount(){
    this.props.authCheck()
  }

  render() { 
    return (    
      <div className="App"> 
    <BrowserRouter >
      <Switch>
      <Route path='/checkout' component={CheckOut} />
      <Route path='/auth' component={Auth} />
      <Route path='/order' component={Orders}/>
      
      <Route path='/logout' component={Logout} />
      <Route path='/' component={Layout} />

      </Switch>
    </BrowserRouter>
    </div>
    )
  }
}

const mapDispatchtoProps =dispatch=>{
return{
  authCheck : ()=>dispatch(Action.authCheck())
}
}


export default connect(null,mapDispatchtoProps)(App);
