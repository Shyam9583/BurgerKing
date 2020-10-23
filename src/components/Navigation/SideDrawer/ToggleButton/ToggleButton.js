import React from 'react';
import classes from './ToggleButton.module.css';

const toggleButton = (props) => (
  <div className={classes.Menu} onClick={props.clicked}>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

export default toggleButton;
