import React from 'react';
import Burger from '../Burger'
import Button from '../Button/Button'
import classes from './CheckOutSummary.module.css'
import {connect} from 'react-redux'

const CheckOutSummary =(props)=>{
    return(
        <div className={classes.CheckOut}>
          
        <h1>Hope it tastes well! </h1>
        <div style={{width:'100%'}} className={classes.Burger}> 
        <Burger ingredients={props.ingredient}/>
        </div>
        {props.building && props.path === '/'?props.btnTypes.map((btnType) => (
    <Button
      btnType={btnType}
      key={btnType}
      onCancel={props.onCancel}
      onOrder={props.onOrder}
    >
      {btnType !== "Success" ? "Cancel" : "Order"}
    </Button>
  )):null}

        </div>
    )
}

const mapStatetoProps =state=>{
  return{
    building: state.BurgerReducer.building,
    path: state.BurgerReducer.path
  }
}

export default connect(mapStatetoProps)(CheckOutSummary)