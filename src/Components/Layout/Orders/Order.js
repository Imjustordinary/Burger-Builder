import React from 'react';
import classes from './Order.module.css'

const Order =(props)=>{
    let body = []
    for (let i in props.ingredients){
        body.push({ingredient:i +' ('+props.ingredients[i]+') ', id:i})
    }
    
    return(
        <div className={classes.Order}>
            Ingredients : {body.map(each=><div className={classes.Ingredient} key={each.id}>{each.ingredient}</div>)}
            <p>Price: <strong>USD {props.totalPrice}</strong></p>
        </div>
    )
}

export default Order