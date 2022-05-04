import React, { Component } from 'react';
import Order from './Order'
import SideDrawer from '../SideDrawer/SideDrawer'
import Toolbar from '../Toolbar/Toolbar'
import classes from './Order.module.css'
import axios from '../axios-order'
import withErrorHandler from '../../../hoc/withErrorHandler'
import {connect} from 'react-redux'
import {setLoading, connectOrder} from '../../../Store/Action'
import Spinner from '../UI/Spinner'
import {Redirect} from 'react-router-dom'

class Orders extends Component {
    state = {
        sideDraw: false
      };
    
      componentDidMount(){
        this.props.setOrder(this.props.token,this.props.userId)
      }

      sideDrawOpenHandler = () => {
        this.setState({ sideDraw: true });
      };
    
      sideDrawCloseHandler = () => {
        this.setState({ sideDraw: false });
        console.log("Closed");
      };
    
    
    render() { 
      let body=<div style={{marginTop:'50%'}}><Spinner/></div>
      if(!this.props.loading){
        
      
      body = this.props.orders.length === 0? <h2 style={{marginTop:'50%'}}>There is no order yet!</h2>:<div className={classes.Orders}>
      {
        this.props.orders.map(info=> 
          <Order ingredients={info.ingredients} key={info.id} totalPrice={info.price.toFixed(2)}/>
          )
      }
    </div>
      }
        return (         
        <div>
          {!this.props.token?<Redirect to='/auth'/>:null }
            <SideDrawer
  onClose={this.sideDrawCloseHandler}

  sideDraw={this.state.sideDraw}
/>
<Toolbar onOpen={this.sideDrawOpenHandler} />
<div className={"layout"}>
  {body}
</div>
</div>
);
    }
}

const mapStatetoProps =(state)=>{
  return{
    orders: state.OrderReducer.orders,
    loading: state.OrderReducer.loading,
    token: state.Auth.token,
    userId:state.Auth.userid
  }
  }

  const mapDispatchtoProps =dispatch=>{
    return{
      setOrder: (token,userId)=> dispatch(connectOrder(token,userId)),
      setLoad: ()=>dispatch(setLoading())
    }
  }

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(Orders,axios));