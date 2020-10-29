import React from "react";
import Button from "../../../UI/Button/Button";

const orderSummary = (props) => {
  const summary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        {key} : {props.ingredients[key]}
      </li>
    );
  });

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul style={{ textTransform: "capitalize" }}>{summary}</ul>
      <p>
        <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout ?</p>
      <Button buttonType="Success" clicked={props.continuePurchase}>
        PROCEED
      </Button>
      <Button buttonType="Danger" clicked={props.clicked}>
        CANCEL
      </Button>
    </React.Fragment>
  );
};

export default orderSummary;
