import React, { Component } from 'react';
import CheckOutSummary from '../../Components/Layout/CheckOutSummary/CheckOutSummary'
import SideDrawer from '../../Components/Layout/SideDrawer/SideDrawer'
import Toolbar from '../../Components/Layout/Toolbar/Toolbar'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../../Components/Layout/ContactData/ContactData'
import {connect} from 'react-redux'

class CheckOut extends Component {

        state = {
          sideDraw:false,
          buttonType: ["Success", "Danger"],
          displaySpinner:false,
          
        };
  
    
      sideDrawOpenHandler = () => {
        this.setState({ sideDraw: true });
      };
    
      sideDrawCloseHandler = () => {
        this.setState({ sideDraw: false });
      };
      cancelHandler =()=>{
        this.props.history.goBack()
      }
    
      orderHandler=()=>{
        
        this.props.history.push('/checkout/contact-data')
      }

    render() { 
      let body= <div>
      <SideDrawer
onClose={this.sideDrawCloseHandler}
sideDraw={this.state.sideDraw}
/>
<Toolbar onOpen={this.sideDrawOpenHandler} />
<div className={"layout"}>
    <CheckOutSummary ingredient={this.props.ign} btnTypes={this.state.buttonType} onOrder={this.orderHandler} onCancel={this.cancelHandler}/>
    
<Route path='/checkout/contact-data' component={ContactData}/>
</div>

</div>

      if(!this.props.ign){
        body=<Redirect to='/'/>
      }
        return ( 
          
            <div>
              {!this.props.token?<Redirect to='/auth' />:null}
              {body}
            </div>
         );
    }
}
 
const mapStatetoProps =state=>{
  return{
    ign: state.BurgerReducer.ingredients,
    totalPrice: state.BurgerReducer.totalPrice,
    token: state.Auth.token
  }
}

export default connect(mapStatetoProps)(CheckOut);