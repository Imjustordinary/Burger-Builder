import React, { Component } from "react";
import BuildControls from "../../Components/Layout/BuildControls/BuildControls";
import Burger from "../../Components/Layout/Burger";
import OrderSummary from "../../Components/Layout/OrderSummary/OrderSummary";
import axios from '../../Components/Layout/axios-order'
import withErrorHandler from '../../hoc/withErrorHandler'
import Spinner from '../../Components/Layout/UI/Spinner'
import classes from '../../Components/Layout/UI/Spinner.module.css'
import {connect} from 'react-redux'
import * as actionFunction from '../../Store/Action'


class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 4,
    purchasing: false,
    buttonType: ["Success", "Danger"],
    displaySpinner:false,
    
  };

 componentDidMount(){
   this.props.setIngredient()
 }


  purchaseHandler = () => {
    if(this.props.token){
    this.setState({ purchasing: true });
    }
    else{
      this.props.setPath('/checkout/contact-data')
      this.props.history.push('/auth')
    }
  };
  orderHandler = ()=>{
    this.props.history.push('/checkout')
  }

  
purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    
    let body = this.props.error?<h2 style={{marginTop:'300px'}}>Ingredients can't be loaded</h2>: <div className={classes.Setter}><Spinner/></div>
    if(this.props.ign){
      body=<div>
        <Burger ingredients={this.props.ign} />
        <OrderSummary
      ingredients={this.props.ign}
      show={this.state.purchasing}
      onCancel={this.purchaseCancelHandler}
      btnTypes={this.state.buttonType}
      onOrder={this.orderHandler}
      displaySpinner = {this.state.displaySpinner}
    />

        <BuildControls
          onAdd={this.props.addIngredient}
          onRemove={this.props.removeIngredient}
          ingredients={this.props.ign}
          price={this.props.totalPrice}
          onOrder={this.purchaseHandler}
        />

      </div>
    }
    return (
      <React.Fragment>
        {body}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state=>{
  return{
    ign : state.BurgerReducer.ingredients,
    totalPrice:state.BurgerReducer.totalPrice,
    error: state.BurgerReducer.error,
    token: state.Auth.token
  }
}

const mapFunctiontoState = dispatch=>{
  return{
    addIngredient: (ignName)=>dispatch({type:'ADD', ingredient:ignName}),
    removeIngredient: (ignName)=>dispatch({type:'REMOVE', ingredient:ignName}),
    setIngredient: ()=>dispatch(actionFunction.connect('SET_INGREDIENTS')),
    setPath: (pathName)=>dispatch(actionFunction.setPath(pathName))
  }
}

export default connect(mapStatetoProps,mapFunctiontoState)(withErrorHandler(BurgerBuilder,axios));
