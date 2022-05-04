import React from "react";
import Modal from "../UI/Modal";
import Button from "../Button/Button";
import Spinner from '../UI/Spinner'

const OrderSummary = (porps) => {
  const Order = Object.keys(porps.ingredients).map((ingredient) => (
    <li key={ingredient}>
      {ingredient}: {porps.ingredients[ingredient]}
    </li>
  ));
  let transcript =      
  <div>
  <h3>Your Order</h3>
  <p>A delious burger with the fallowing ingredients: </p>
  <ul>{Order}</ul>
  <p>Continue purchase?</p>
  {porps.btnTypes.map((btnType) => (
    <Button
      btnType={btnType}
      key={btnType}
      onCancel={porps.onCancel}
      onOrder={porps.onOrder}
    >
      {btnType !== "Success" ? "Cancel" : "Continue"}
    </Button>
  ))}
  </div>
  if(porps.displaySpinner){transcript=<Spinner/>
  }
  return (
    <Modal show={porps.show} onCancel={porps.onCancel}>
      {transcript}
    </Modal>
  );
};

export default OrderSummary;
