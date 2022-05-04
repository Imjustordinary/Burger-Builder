import React, { Component } from "react";
import Classes from "./BurgerIngredient.module.css";
import PropType from "prop-types";
class BurgerIngredient extends Component {
  render() {
    let Ingredient = null;
    switch (this.props.type) {
      case "BreadBottom":
        Ingredient = <div className={Classes.BreadBottom}></div>;
        break;
      case "BreadTop":
        Ingredient = (
          <div className={Classes.BreadTop}>
            <div className={Classes.Seeds1}></div>
            <div className={Classes.Seeds2}></div>
          </div>
        );
        break;
      case "Meat":
        Ingredient = <div className={Classes.Meat}></div>;
        break;
      case "Cheese":
        Ingredient = <div className={Classes.Cheese}></div>;
        break;

      case "Salad":
        Ingredient = <div className={Classes.Salad}></div>;
        break;

      case "Bacon":
        Ingredient = <div className={Classes.Bacon}></div>;
        break;

      default:
        Ingredient = null;
    }

    return Ingredient;
  }
}

export default BurgerIngredient;

BurgerIngredient.prototypes = {
  Ingredient: PropType.string.isRequired,
};
