import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
import { DEFAULT_COST } from '../../../containers/BurgerBuilder/BurgerBuilder';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <h3> Price: {props.state.totalPrice.toFixed(2)}$</h3>
      {controls.map((ctl) => (
        <BuildControl
          key={ctl.type}
          label={ctl.label}
          increased={() => props.increased(ctl.type)}
          decreased={() => props.decreased(ctl.type)}
          disabled={props.state.ingredients[ctl.type] === 0}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={props.state.totalPrice === DEFAULT_COST}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
