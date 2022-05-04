import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Action from '../../../Store/Action'



class Logout extends Component {
    
    componentDidMount(){
        this.props.onLogout()
    }

    render() { 
        return  <Redirect to='/' />
        
    }
}
const mapDispatchtoProps =dispatch=>{
    return{
        onLogout: ()=> dispatch(Action.logOut())
    }
}

export default connect(null,mapDispatchtoProps)(Logout);