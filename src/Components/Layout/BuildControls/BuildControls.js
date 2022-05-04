import React from "react";
import Classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import "./OrderButton.css";
import {connect} from 'react-redux'

const BuildControls = (props) => {
  let disable = false;
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])];
    })

    .reduce((acc, item) => {
      return acc.concat(item);
    }, []);
  if (transformedIngredients.length === 0) {
    disable = true;
  } else {
    disable = false;
  }
  return (
    <div className={Classes.BuildControls}>
      <strong>Total price :{props.price.toFixed(2)}</strong>
      {Object.keys(props.ingredients).map((control) => (
        <BuildControl
          key={control}
          Label={control}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
          ingredients={props.ingredients}
        />
      ))}
      <button
        disabled={disable}
        className={"OrderButton"}
        onClick={props.onOrder}
      >
        {props.token?'ORDER NOW':'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

const mapStatetoProps =state=>{
  return{
    token: state.Auth.token
  }
}

export default connect(mapStatetoProps)(BuildControls);
