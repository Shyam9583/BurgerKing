import React from "react";
import Burgeringredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map((key) => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <Burgeringredient key={key + i} type={key} />;
      });
    })
    .reduce((arr, el) => arr.concat(el), []);

  return (
    <div className={classes.Burger}>
      <Burgeringredient type="bread-top" />
      {transformedIngredients.length === 0 ? (
        <p>Please Add ingredients</p>
      ) : (
        transformedIngredients
      )}
      <Burgeringredient type="bread-bottom" />
    </div>
  );
};

export default burger;
