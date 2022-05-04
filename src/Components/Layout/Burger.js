import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";
const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, index) => {
        return <BurgerIngredient key={ingredient + index} type={ingredient} />;
      });
    })

    .reduce((acc, item) => {
      return acc.concat(item);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = "Please add some ingredient";
  }

  return (
    <div className="Burger">
      <BurgerIngredient type={"BreadTop"} />
      {transformedIngredients}
      <BurgerIngredient type={"BreadBottom"} />
    </div>
  );
};

export default Burger;
