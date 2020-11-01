import classes from "./Order.module.css";
import React from "react";

const order = (props) => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key],
    });
  }
  return (
    <div className={classes.Order}>
      <p>
        <strong>Ingredients</strong>:{" "}
        {ingredients.map((ig) => {
          return (
            <span key={ig.name}>
              {ig.name} ({ig.amount}){" "}
            </span>
          );
        })}{" "}
      </p>
      <p>
        <strong>Price</strong>: USD {props.price.toFixed(2)}
      </p>
    </div>
  );
};

export default order;
